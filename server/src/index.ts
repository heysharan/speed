// import express from 'express'
// import cors from 'cors'

// const app = express();
// app.use(cors());

// interface Todo {
//     id: number,
//     title: string,
//     description: string,
//     completed: boolean
// }

// let todos: Todo[] = []

// const generateTodos = (count: number) => {
//     todos = Array.from({ length: count }, (_, idx) => {
//         const n = idx + 1;
//         return {
//             id: n,
//             title: `Todo ${n}`,
//             description: `This is Todo ${n}`,
//             completed: n % 2 === 0 ? true : false
//         }
//     })
// }


// let count: number
// let lastcount: number = -1

// app.get('/todos', (req, res) => {

//     do {
//         count = Math.floor(Math.random() * 100)
//     } while (count === lastcount)
//     lastcount = count

//     generateTodos(count)
//     res.json({
//         count: count,
//         todos: todos,
//     })
// })

// app.listen(3000, () => {
//     console.log("Server running on PORT 3000")
// })


import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors())

app.get('/ping', (req, res) => {
    res.sendStatus(200)
})

app.get('/download', (req, res) => {
  const sizeInMB = 10; // default 10 MB
  const sizeInBytes = sizeInMB * 1024 * 1024;;

  const chunk = Buffer.alloc(1024 * 1024, '1'); // 1MB buffer
  let sent = 0;

  const send = () => {
    if (sent >= sizeInBytes) {
      return res.end();
    }

    res.write(chunk, () => {
      sent += chunk.length;
      setImmediate(send);
    });
  };

  send();
});

app.post('/upload', (req, res) => {
  let totalBytes = 0;

  req.on('data', chunk => {
    totalBytes += chunk.length;
  });

  req.on('end', () => {
    res.json({ received: totalBytes });
  });
});


app.listen(3003, () => {
    console.log("Server running on PORT 3003")
})


