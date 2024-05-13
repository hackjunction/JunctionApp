import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import download from 'downloadjs'

// TODO: This is hardcoded at the moment for Junction2021 certificate. Make this modular for all certificates
const colorList = [
    { white: rgb(0.95, 0.95, 0.95) },
    { black: rgb(0.01, 0.01, 0.01) },
    { red: rgb(1, 0, 0) },
    { green: rgb(0, 1, 0) },
    { blue: rgb(0, 0, 1) },
]

const modifyPdf = async (
    url,
    x,
    y,
    name,
    slug,
    color = 'white',
    enableRegistrationId,
    registrationIdX,
    registrationIdY,
    registrationIdColor,
    registrationId,
) => {
    const colorConvertToRgb = color => {
        switch (color) {
            case 'white':
                return rgb(0.95, 0.95, 0.95)
            case 'black':
                return rgb(0.01, 0.01, 0.01)
            case 'red':
                return rgb(1, 0, 0)
            case 'green':
                return rgb(0, 1, 0)
            case 'blue':
                return rgb(0, 0, 1)
            default:
                return rgb(0.95, 0.95, 0.95)
        }
    }

    const participantNameColor = colorConvertToRgb(color)

    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const page = pages[0]

    const text = name
    const participantNamesize = 20

    page.drawText(text, {
        x: x,
        y: y,
        size: participantNamesize,
        font: font,
        align: 'center',
        color: participantNameColor,
    })

    if (enableRegistrationId) {
        const registrationIdTextSize = 10
        const registrationIdColorRgb = colorConvertToRgb(registrationIdColor)
        page.drawText(registrationId, {
            x: registrationIdX,
            y: registrationIdY,
            size: registrationIdTextSize,
            font: font,
            align: 'center',
            color: registrationIdColorRgb,
        })
    }

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, `${name}-${slug}-certificate`, 'application/pdf')
}

export default modifyPdf
