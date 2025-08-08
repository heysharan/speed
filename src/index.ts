const measurePing = async () => {
    const start = performance.now();
    await fetch('http://pingserver.cmsharan.com/ping',
        { method: "HEAD" }
    )
    const ping = performance.now() - start;
    console.log(`Ping: ${ping.toFixed(0)} ms`)
}

const measureDownload = async () => {
    const start = performance.now();
    const res = await fetch('http://pingserver.cmsharan.com/download')
    await res.arrayBuffer();
    const duration = performance.now() - start;
    const speedMbps = (10 * 8) / (duration / 1000)
    console.log(`Download Speed: ${speedMbps.toFixed(0)}`)
}

const measureUpload = async () => {
    const buffer = new Uint8Array(10 * 1024 * 1024).fill(1)
    const start = performance.now();
    await fetch('http://pingserver.cmsharan.com/upload', {
        method: 'POST',
        body: buffer
    });
    const duration = performance.now() - start
    const speedMbps = (10 * 8) / (duration / 1000)
    console.log(`Upload Speed: ${speedMbps.toFixed(0)}`)
}

measurePing()
measureUpload()
measureDownload()


