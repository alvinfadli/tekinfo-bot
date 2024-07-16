import os
from app.db import supabase
from langchain_community.document_loaders import PyPDFLoader, TextLoader, Docx2txtLoader

def load_docs():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(BASE_DIR, 'data')

    documents = []

    try:
        files = os.listdir(data_dir)
    except FileNotFoundError:
        print(f"Directory not found: {data_dir}")
        return []
    except PermissionError:
        print(f"Permission denied: {data_dir}")
        return []

    for file in files:
        file_path = os.path.join(data_dir, file)
        if file.endswith(".pdf"):
            try:
                loader = PyPDFLoader(file_path)
                documents.extend(loader.load())
            except Exception as e:
                print(f"Error loading PDF file {file}: {e}")
        elif file.endswith('.docx') or file.endswith('.doc'):
            try:
                loader = Docx2txtLoader(file_path)
                documents.extend(loader.load())
            except Exception as e:
                print(f"Error loading DOCX/DOC file {file}: {e}")
        elif file.endswith('.txt'):
            try:
                loader = TextLoader(file_path)
                documents.extend(loader.load())
            except Exception as e:
                print(f"Error loading TXT file {file}: {e}")

    return documents

def get_data():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(BASE_DIR, 'data')

    try:
        contents = os.listdir(data_dir)
    except FileNotFoundError:
        print(f"Directory not found: {data_dir}")
        return
    except PermissionError:
        print(f"Permission denied: {data_dir}")
        return

    files_in_local = [f for f in contents if os.path.isfile(os.path.join(data_dir, f))]

    try:
        files = supabase.storage.from_("rag-data").list()
    except Exception as e:
        print(f"Error fetching file list from storage: {e}")
        return

    file_in_storage = [file['name'] for file in files]

    file_to_delete = list(set(files_in_local) - set(file_in_storage))
    file_to_download = list(set(file_in_storage) - set(files_in_local))

    for file in file_to_delete:
        try:
            os.remove(os.path.join(data_dir, file))
            print("Removed", file)
        except FileNotFoundError:
            print(f"File not found: {file}")
        except PermissionError:
            print(f"Permission denied when removing file: {file}")
        except Exception as e:
            print(f"Error removing file {file}: {e}")

    for file in file_to_download:
        try:
            with open(os.path.join(data_dir, file), 'wb+') as f:
                res = supabase.storage.from_('rag-data').download(file)
                f.write(res)
                print("Downloaded", file)
        except Exception as e:
            print(f"Error downloading file {file}: {e}")
