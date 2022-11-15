import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import download from 'downloadjs'

// TODO: This is hardcoded at the moment for Junction2021 certificate. Make this modular for all certificates

const modifyPdf = async (url, x, y, name, slug, color) => {
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const page = pages[0]

    const text = name
    const textSize = 20
    //const textHeight = font.heightAtSize(textSize)

    const textWidth = font.widthOfTextAtSize(text, textSize)
    // align text center
    page.drawText(text, {
        x: 100 + 200 - textWidth / 2,
        y: 540,
        size: textSize,
        font: font,
        align: 'center',
        color: rgb(0.95, 0.95, 0.95),
    })
    // page.drawRectangle({
    //     x: 100,
    //     y: 475,
    //     width: 400,
    //     height: textHeight,

    //     borderWidth: 1.5,
    // })

    // firstPage.drawText(name, {
    //     x: boxX + boxWidth - textWidth,
    //     y: boxY,
    //     size: textSize,
    //     font: helveticaFont,

    //     color: rgb(0.95, 0.95, 0.95),
    // })

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, `${name}-${slug}-certificate`, 'application/pdf')
}

export default modifyPdf
