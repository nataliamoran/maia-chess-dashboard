import os
import os.path
import collections.abc

from .stockfish_model import _sf_default_path, Stockfish
from ..tf import MaiaNet


def list_maia_paths():
    models_dict = {}
    for p in os.listdir(os.path.join(os.path.dirname(__file__), "maia")):
        if p.endswith(".pb.gz"):
            models_dict[p.replace(".pb.gz", "")] = os.path.abspath(
                os.path.join(os.path.dirname(__file__), "maia", p)
            )
    return models_dict


def list_maias():
    return sorted(list_maia_paths().keys())


def stockfish_path():
    return _sf_default_path


class _Models(collections.abc.Mapping):
    def __init__(self):
        self.model_list = list_maias() + ["stockfish"]
        self.model_paths = list_maia_paths()
        self.model_paths["stockfish"] = stockfish_path()
        self.loaded_models = {"stockfish": Stockfish()}
        self.load_gpu = None

    def _get_memoized_model(self, name):
        if name in self.model_list:
            try:
                return self.loaded_models[name]
            except:
                return self.loaded_models.setdefault(
                    name, MaiaNet(self.model_paths[name], gpu_id=self.load_gpu)
                )
        else:
            raise KeyError(f"{name} not found")

    def __getattr__(self, name):
        try:
            return self._get_memoized_model(name)
        except KeyError:
            raise AttributeError(
                f"{name} not a known model, known models are: {', '.join(self.model_list)}"
            )

    def __dir__(self):
        return self.model_list + super().__dir__()

    def __getitem__(self, key):
        try:
            return self._get_memoized_model(key)
        except KeyError:
            raise KeyError(
                f"{key} not a known model, known models are: {', '.join(self.model_list)}"
            ) from None

    def __iter__(self):
        for name in self.model_list:
            yield name

    def __len__(self):
        return len(self.model_list)


models = _Models()
