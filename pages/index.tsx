import Link from 'next/link'
import Layout from '../components/Layout'
import { createWorker } from 'tesseract.js';
import * as React from "react"

const IndexPage = () => {
  const [file, setFile] = React.useState<any>();
  const [textOcr, setTextOcr] = React.useState('');
  const worker = createWorker({
    logger: m => console.log(m)
  })

  const tryOcr = async() => {
    await worker.load();
    await worker.loadLanguage('jpn');
    await worker.initialize('jpn');
    const { data: { text } } = await worker.recognize(file);
    setTextOcr(text);
    await worker.terminate();
  }

  // fileData 取得
  const handleChange = (e: any) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0])
  }

  const handleClick = async() => {
    if (!file) return
    setTextOcr('Recognizing...')
    await tryOcr();
  }
  
  return (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <input type="file" onChange={handleChange} /><br />
    <button className="button" onClick={handleClick}>Try OCR</button>
    <p>
      <Link href="/about">
        <a>{textOcr}</a>
      </Link>
    </p>
  </Layout>
)}

export default IndexPage
