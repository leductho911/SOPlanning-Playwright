export class Helpers {

}

export class DateHelpers {
    /**
     * @description Get the current date in a specified format
     * @param {string} format The date format to return. Defaults to 'YYYY-MM-DD'
     * @param {number} daysOffset The number of days to offset the current date. Defaults to 0
     * @returns {Promise<string>} The current date in the specified format
     * @example
     * const date = await DateHelpers.getCurrentDate('YYYY-MM-DD')
     * const date = await DateHelpers.getCurrentDate('DD-MM-YYYY', 3)
     */
    public async getCurrentDate(format: string = 'YYYY-MM-DD', daysOffset: number = 0): Promise<string> {
        const today = new Date()
        today.setDate(today.getDate() + daysOffset)

        const year = today.getFullYear()
        const month = (today.getMonth() + 1).toString().padStart(2, '0') // Months are 0-indexed
        const day = today.getDate().toString().padStart(2, '0')
      
        return format.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
    }
}