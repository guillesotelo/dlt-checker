
(function main() {
    window.addEventListener('DOMContentLoaded', () => {
        const logs = Array.from(document.querySelectorAll('.entry'))

        const entriesList = document.querySelector('.entries-list')
        const searchInput = document.querySelector('#filter-input')

        const filterLogs = (search) => {
            if (entriesList) {
                if (!search) entriesList.innerHTML = logs.map(log => log.outerHTML).join('')
                else {
                    entriesList.innerHTML = logs
                        .filter(log => log.textContent.includes(search))
                        .map(log => log.outerHTML)
                        .join('')
                }
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => filterLogs(e.target.value))
        }

        const dropdown = document.getElementById('entityDropdown')
        
        if(dropdown) {
            const tds = Array.from(document.querySelectorAll('td.entity-type'))
            const uniqueValues = [...new Set(tds.map(td => td.textContent.trim()))]
            uniqueValues.forEach(value => {
                const option = document.createElement('option')
                option.value = value
                option.textContent = value
                dropdown.appendChild(option)
            })

            dropdown.addEventListener('change', () => filterLogs(dropdown.value))
        }
    })
})()