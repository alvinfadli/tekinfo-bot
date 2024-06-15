import os
from app.config import Config

def test_config_load():
    assert Config.SUPABASE_URL is not None
    assert Config.SUPABASE_KEY is not None
    assert Config.REPLICATE_API_TOKEN is not None
