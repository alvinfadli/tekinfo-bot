
# Tekinfo-Bot

Tekinfo-Bot is a web-based chatbot application to answer questions about Information Technology Department of Politeknik Negeri Padang using LLM Model (Llama 3) with Retrieval-Augmented Generation method

(Deployed):
- Chatbot App : <a href="https://alvinfadli-tekinfo-bot-hf.hf.space/" target="_blank">https://alvinfadli-tekinfo-bot-hf.hf.space/</a> 
- Admin Dashboard : <a href="https://tekinfo-bot.vercel.app/" target="_blank">https://tekinfo-bot.vercel.app/</a> — <span style="color:yellow;">Limited Access</span>, contact me for more details.

### Chatbot app

#### Technologies

- Python
- Langchain
- Streamlit
- Llama 3 (LLM)

#### Navigate to chatbot directory

```bash
  cd chatbot
```

#### Create virtual environment

```bash
  python -m venv venv
```

#### Activate virtual environment

On windows
```bash
  .\venv\Scripts\activate

```

On linux
```bash
  source venv/Scripts/activate
```

#### Install dependencies
```bash
  pip install -r requirements.txt
```

#### Setup env 

Create env using env.example file

```bash
  cp .env.example .env
```

Fill the variable with your own API keys from https://replicate.com/ and https://huggingface.co/

#### Running
```bash
  python -m streamlit app.py
```

### Chatbot Admin App

#### Technologies

- Javascript/Typescript
- Next Js
- React
- Supabase (Database and Authentication)
- shadcn/ui

#### Navigate to chatbot directory

```bash
  cd chatbot-admin
```

#### Install dependencies

```bash
  npm install
```

#### Setup env 

Create env using env.example file

```bash
  cp .env.local.example .env.local
```

Fill the variable with your own API keys from https://supabase.com/

#### Running
```bash
  npm run dev
```
