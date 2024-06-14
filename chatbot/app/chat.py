import streamlit as st
from streamlit_chat import message

def initialize_session_state():
    if 'history' not in st.session_state:
        st.session_state['history'] = []

    if 'generated' not in st.session_state:
        st.session_state['generated'] = ["Hello! Saya bisa membantu anda menjawab pertanyaan seputar Jurusan Teknologi Informasi!"]

    if 'past' not in st.session_state:
        st.session_state['past'] = ["Hey! 👋"]

    if 'data_len' not in st.session_state:
        st.session_state['data_len'] = 0
    
    if 'vector_store' not in st.session_state:
        st.session_state['vector_store'] = None

def conversation_chat(query, chain, history):
    result = chain({"question": query, "chat_history": history})
    history.append((query, result["answer"]))
    return result["answer"]

def display_chat_history(chain):
    reply_container = st.container()
    container = st.container()

    user_input = st.chat_input(placeholder="Masukkan pertanyaan...")
    with container:
        if user_input:
            with st.spinner('Generating response...'):
                output = conversation_chat(user_input, chain, st.session_state['history'])

            st.session_state['past'].append(user_input)
            st.session_state['generated'].append(output)

    if st.session_state['generated']:
        with reply_container:
            for i in range(len(st.session_state['generated'])):
                message(st.session_state["past"][i], is_user=True, key=str(i) + '_user', avatar_style="no-avatar")
                message(st.session_state["generated"][i], key=str(i), avatar_style="no-avatar")
