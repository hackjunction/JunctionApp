import { ExportToCsv } from 'export-to-csv'

const CsvExporterService = {}

CsvExporterService.exportToCsv = (data, fileName) => {
    const options = {
        filename: fileName,
        useKeysAsHeaders: true,
    }

    const csvExporter = new ExportToCsv(options)
    csvExporter.generateCsv(data)
}

export default CsvExporterService
