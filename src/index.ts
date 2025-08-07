const measurePing = async () => {
    const start = performance.now();
    await fetch('http://pingserver.cmsharan.com/ping',
        { method: "HEAD" }
    )
    const end = performance.now();
    const ping = end - start
    console.log(`Ping: ${ping} ms`)
}

measurePing()