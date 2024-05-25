export default function parseCSV(csvText: string): Record<string, string>[] {
    const rows = csvText.split(/\r?\n/);
    const headers: string[] = rows[0].split(',');
    const data: Record<string, string>[] = [];
    
    for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',');
        const rowObject: Record<string, string> = {};
        
        for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = rowData[j];
        }
        
        data.push(rowObject);
    }
    
    return data;
}
