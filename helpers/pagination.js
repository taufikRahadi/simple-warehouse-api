const pagination = async data => {
    const limit = data.limit ? parseInt(data.limit) : 10
    const page = data.page && data.page > 0 ? (parseInt(data.page) - 1) : 0

    const totalItems = data.total
    const totalPages = (limit % data.total) + 1
    const currentPage = page + 1

    return {
        limit, page, data: { totalItems, totalPages, currentPage }
    }
}
module.exports = pagination