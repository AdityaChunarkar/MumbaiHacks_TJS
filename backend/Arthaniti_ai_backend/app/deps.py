from fastapi import Header
async def get_api_key(x_api_key: str | None = Header(None)):
    return x_api_key
