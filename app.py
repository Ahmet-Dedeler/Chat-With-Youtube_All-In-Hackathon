import streamlit as st
hidden_style = """
            <style>
            #MainMenu  {visibility: hidden;}
            footer  {visibility: hidden;}
            </style>
            """
st.markdown(hidden_style, unsafe_allow_html=True)

def basic_version():
    import argparse
    import os
    import shutil
    import time
    import torch
    import textwrap
    from urllib.parse import urlparse, parse_qs
    from dotenv import load_dotenv
    from langdetect import detect
    from deep_translator import GoogleTranslator
    from transformers import pipeline
    import streamlit as st
    from langchain import HuggingFaceHub
    from langchain.chains import RetrievalQA
    from langchain.chat_models import ChatOpenAI
    from langchain.document_loaders import YoutubeLoader
    from langchain.embeddings import HuggingFaceBgeEmbeddings
    from langchain.embeddings import OpenAIEmbeddings
    from langchain.embeddings import HuggingFaceInstructEmbeddings
    from langchain.llms import OpenAI
    from langchain.text_splitter import RecursiveCharacterTextSplitter
    from langchain.vectorstores import Chroma
    load_dotenv()

    def text_writer(input_text: str, speed: float):
        container = st.empty()
        displayed_text = ""

        for char in input_text:
            displayed_text += char
            container.markdown(displayed_text)
            time.sleep(1/speed)

    def wrap_text_keep_newlines(input_text, width=110):
        lines = input_text.split('\n')
        wrapped_lines = [textwrap.fill(line, width=width) for line in lines]
        wrapped_text = '\n'.join(wrapped_lines)
        return wrapped_text

    def process_response(original_response):
        text_writer(original_response["result"], speed=40)

    def get_video_id(youtube_url):
        try:
            parsed_url = urlparse(youtube_url)
            query_params = parse_qs(parsed_url.query)
            video_id = query_params.get('v', [None])[0]

            return video_id
        except Exception as e:
            print(f"Error extracting video ID: {e}")
            return None

    def start_basic_version():
        HUGGINGFACE_API_TOKEN = os.environ["HUGGINGFACE_API_TOKEN"]
        model_name = "BAAI/bge-base-en"
        encode_kwargs = {'normalize_embeddings': True}

        st.title('Chat with Youtube 🎬🤖')
        st.markdown(""" Using AI to interact with Youtube! """)

        video_url = st.text_input("Insert The video URL",  placeholder="Format should be like: https://www.youtube.com/watch?v=pSLeYvld8Mk")
        query = st.text_input("Ask any question about the video",help="Suggested queries: Summarize the key points of this video - What is this video about - Ask about a specific thing in the video ")
        st.warning("⚠️ Please Keep in mind that the accuracy of the response relies on the :red[Video's quality] and the :red[prompt's Quality]. Occasionally, the response may not be entirely accurate. Consider using the response as a reference rather than a definitive answer.")

        if st.button("Submit Question", type="primary"):
            with st.spinner('Processing the Video...'):
                video_id = get_video_id(video_url)
                loader = YoutubeLoader(video_id)
                documents = loader.load()

                text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
                documents = text_splitter.split_documents(documents)
                if os.path.exists('./data'):
                    shutil.rmtree('./data')
                vector_db = Chroma.from_documents(
                    documents,
                    embedding= HuggingFaceBgeEmbeddings( model_name=model_name, model_kwargs={'device': 'cuda' if torch.cuda.is_available() else 'cpu'}, encode_kwargs=encode_kwargs)
                )

                repo_id = "tiiuae/falcon-7b-instruct"
                qa_chain = RetrievalQA.from_chain_type(
                    llm=HuggingFaceHub(huggingfacehub_api_token=HUGGINGFACE_API_TOKEN,
                                    repo_id=repo_id,
                                    model_kwargs={"temperature":0.2, "max_new_tokens":1000}),
                    retriever=vector_db.as_retriever(),
                    return_source_documents=False,
                    verbose=False
                )
            with st.spinner('Generating Answer...'):
                llm_response = qa_chain(query)
                process_response(llm_response)
    start_basic_version()

basic_version()

st.sidebar.markdown("## Chat with Youtube using AI 🎬🤖") 
st.sidebar.markdown("""Built by <a href="https://github.com/Ahmet-Dedeler"> Ahmet </a> & <a href="https://github.com/arhaamwanii"> Arhaam </a> for MLH All in Open Source Hackathon.""", unsafe_allow_html=True)
st.sidebar.markdown('<a href="https://github.com/Ahmet-Dedeler/Chat-With-Youtube_All-In-Hackathon"> Check out the project on GitHub <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="30" height="30"></a>', unsafe_allow_html=True)