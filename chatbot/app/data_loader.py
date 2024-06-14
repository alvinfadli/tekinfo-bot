import os
from app.db import supabase

DATA_PATH = './data'

def load_docs():
    from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader

    text = []
    loader = DirectoryLoader(DATA_PATH, glob='*.pdf', loader_cls=PyPDFLoader)
    
    if loader:
        text.extend(loader.load())

    return text

def get_data():
    dir_path = "./data/"
    contents = os.listdir(dir_path)
    files_in_local = [f for f in contents if os.path.isfile(os.path.join(dir_path, f))]
    files = supabase.storage.from_("rag-data").list()
    file_in_storage = [file['name'] for file in files]

    file_to_delete = list(set(files_in_local) - set(file_in_storage))
    file_to_download = list(set(file_in_storage) - set(files_in_local))

    for file in file_to_delete:
        try:
            os.remove(dir_path+file)
            print("removed", file)
        except:
            print("error removing file")
    for file in file_to_download:
        with open('./data/'+file, 'wb+') as f:
            res = supabase.storage.from_('rag-data').download(file)
            f.write(res)
