import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="grid">
          <Link href="/sight-words" as="/sight-words">
            <a className="card">
              <h3>Sight Words</h3>
            </a>
          </Link>

          <Link href="/digraphs" as="/digraphs">
            <a className="card">
              <h3>Digraphs</h3>
            </a>
          </Link>

          <Link href="/blends">
            <a className="card">
              <h3>Blends</h3>
            </a>
          </Link>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        
      `}</style>

      <style jsx global>{`
        html,
        body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        
        * {
            box-sizing: border-box;
        }
        
        .container {
            border: 1px solid #eaeaea;
            border-radius: 10px;
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .main {
            border: 1px solid #000000;
            border-radius: 10px;
            background-repeat: no-repeat;
            max-width: 500px;
            max-height: 800px;
            margin: auto;
            background-image: url('/home.png');
            flex: 1;
            display: flex;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        
        .grid {
            display: flex;
            flex-direction: row;
            align-self: flex-end;
            max-width: 800px;
            margin-top: 3rem;
        }
        
        .card {
            margin: 1rem;
            padding: 0.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
        }
        
        .card:hover,
        .card:focus,
        .card:active {
            color: #0070f3;
            border-color: #0070f3;
        }
        
        .card h3 {
            margin: 1px;
            font-size: 1.5rem;
            font-weight:
        }
        
        .logo {
            height: 1em;
        }
        
        footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        footer img {
            margin-left: 0.5rem;
        }
        
        footer a {
            display: flex;
            justify-content: center;
            align-items: center;
}
      `}</style>
    </div>
  )
}
