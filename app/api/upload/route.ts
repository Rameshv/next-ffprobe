var ffprobe = require('ffprobe-static')
var ffmpeg = require('ffmpeg-static')
var fs = require('fs')
import util from 'util'
const exec = util.promisify(require('child_process').exec)
import path  from 'path'

export async function POST(req: NextRequest) {
    console.log(ffmpeg)
	const data = await req.formData()
    const uploads = []
    const keys = data.keys()

    const file = data.get(keys.next().value) as File

    const outpath = `/tmp/${file.name}`
    if (!fs.existsSync(path.dirname(outpath))){
        fs.mkdirSync(path.dirname(outpath))
    }
    const buffer  = await file.arrayBuffer()
    fs.writeFileSync(outpath, Buffer.from(buffer))

    const ffprobeCommand = `${ffprobe.path} -i ${outpath} -show_entries format=duration -v quiet -of csv="p=0"`
    const { stdout: durationOutput } = await exec(ffprobeCommand)
    const durationInSeconds = parseFloat(durationOutput.trim())
    const durationInMins = Math.round(durationInSeconds / 60)


    return NextResponse.json(durationInMins)
}