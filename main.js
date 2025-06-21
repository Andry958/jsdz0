const links = document.querySelectorAll('#linkList a');

links.forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('http://')) {
        link.classList.add('external-link');
    }
});

//2
document.querySelectorAll('#directoryTree li').forEach(item => {
    if (item.querySelector('ul')) {
        item.classList.add('collapsed');

        item.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('collapsed');
        });
    }
});

//3
const bookList = document.getElementById('bookList');
const items = Array.from(bookList.querySelectorAll('li'));
let lastSelectedIndex = null;

items.forEach((item, index) => {
    item.addEventListener('click', function (event) {
        const isCtrl = event.ctrlKey || event.metaKey;
        const isShift = event.shiftKey;

        if (isShift && lastSelectedIndex !== null) {
            // SHIFT: вибрати діапазон
            const currentIndex = index;
            const [start, end] = [lastSelectedIndex, currentIndex].sort((a, b) => a - b);
            for (let i = start; i <= end; i++) {
                items[i].classList.add('selected');
            }
        } else if (isCtrl) {
            this.classList.toggle('selected');
            lastSelectedIndex = index;
        } else {
            items.forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            lastSelectedIndex = index;
        }
    });
});

//4
const table = document.getElementById('peopleTable');
const headers = table.querySelectorAll('th');
let sortDirection = true;

headers.forEach((header, columnIndex) => {
    header.addEventListener('click', () => {
        const rows = Array.from(table.tBodies[0].rows);
        const isNumberColumn = !isNaN(rows[0].cells[columnIndex].textContent.trim());

        rows.sort((a, b) => {
            const cellA = a.cells[columnIndex].textContent.trim();
            const cellB = b.cells[columnIndex].textContent.trim();

            if (isNumberColumn) {
                return sortDirection ? cellA - cellB : cellB - cellA;
            } else {
                return sortDirection
                    ? cellA.localeCompare(cellB)
                    : cellB.localeCompare(cellA);
            }
        });

        sortDirection = !sortDirection;

        rows.forEach(row => table.tBodies[0].appendChild(row));
    });
});