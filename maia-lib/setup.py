import setuptools
import re

with open("maia_lib/__init__.py") as f:
    versionString = re.search(r'__version__ = "(.+)"', f.read()).group(1)

with open("README.md") as f:
    readme = f.read()

with open("requirements.txt") as f:
    requirements = [l.strip() for l in f]

if __name__ == "__main__":
    setuptools.setup(
        name="maia_lib",
        version=versionString,
        author="Reid McIlroy-Young",
        author_email="reidmcy@cs.toronto.edu",
        description="Maia library, currently private",
        url="https://github.com/CSSLab/maia-lib",
        long_description=readme,
        long_description_content_type="text/markdown",
        zip_safe=False,
        python_requires=">=3.7",
        install_requires=requirements,
        extras_require={
            "plotting": ["matplotlib", "seaborn", "pandas"],
        },
        packages=[
            "maia_lib",
            "maia_lib.model_utils",
            "maia_lib.shared",
            "maia_lib.shared.proto",
            "maia_lib.leela_board",
            "maia_lib.tf",
            "maia_lib.analysis",
            "maia_lib.pgn_helpers",
        ],
        include_package_data=True,
        package_data={
            "model_utils/maia": ["*.pb.gz"],
            "model_utils/stockfish": ["stockfish_14*"],
        },
    )
