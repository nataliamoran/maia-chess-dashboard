from bson import ObjectId


class PyObjectId(ObjectId):
    # This code snippet is taken from https://github.com/mongodb-developer/mongodb-with-fastapi/blob/master/app.py
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")
