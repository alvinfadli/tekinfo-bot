from app.db import supabase

def test_supabase_connection():
    #check conn
    assert supabase is not None