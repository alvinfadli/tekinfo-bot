import streamlit as st
from app.chat import initialize_session_state, display_chat_history
from app.data_loader import get_data, load_docs
from app.document_processor import process_documents
from app.prompts import llama_prompt
from langchain_community.llms import Replicate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.document_transformers import (
    LongContextReorder
)


def create_conversational_chain(vector_store):
    llm = Replicate(
        model="meta/meta-llama-3-8b-instruct",
        model_kwargs={"temperature": 0.5, "top_p": 1, "max_new_tokens":10000}
    )

    memory = ConversationBufferMemory(
        memory_key="chat_history", return_messages=True, output_key='answer')
    chain = ConversationalRetrievalChain.from_llm(llm, retriever=vector_store.as_retriever(search_kwargs={"k": 6}), combine_docs_chain_kwargs={"prompt": llama_prompt}, return_source_documents=True, memory=memory)

    return chain

def reorder_embedding(docs):
    reordering = LongContextReorder()
    reordered_docs = reordering.transform_documents(docs)
    return reordered_docs

def main():
    initialize_session_state()
    get_data()

    if len(st.session_state['history']) == 0:
        docs = load_docs()
        reordered = reorder_embedding(docs)
        vector_store = process_documents(reordered)
        st.session_state['vector_store'] = vector_store

    if st.session_state['vector_store'] is not None:
        chain = create_conversational_chain(st.session_state['vector_store'])
        display_chat_history(chain)

if __name__ == "__main__":
    main()
