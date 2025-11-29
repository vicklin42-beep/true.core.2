 // --- 書籍分級標準 (用於詳細頁顯示) ---
        const conditionStandards = {
            'S': {
                name: 'S 級｜近全新',
                color: 'cond-S',
                description: '幾乎沒翻閱痕跡、無筆記劃線、封面完整無折、無破損水漬。'
            },
            'A': {
                name: 'A 級｜輕微使用',
                color: 'cond-A',
                description: '少量劃線（不影響閱讀），可能有輕微筆跡或封角磨損。'
            },
            'B': {
                name: 'B 級｜可用但有明顯註記',
                color: 'cond-B',
                description: '劃線多、有筆記、書角折痕明顯或封面有明顯磨損。'
            },
            'C': {
                name: 'C 級｜瑕疵書',
                color: 'cond-C',
                description: '包含撕頁、破損、水漬、發霉、部分頁脫落或嚴重筆記等任一瑕疵。'
            }
        };

        // 模擬書籍資料庫 (更新了書況評級)
        const mockBooks = [
            { id: 1, title: "微積分上冊 (第十版)", course: "應用微積分", teacher: "丁教授", version: "2020", price: 350, condition: 'A', stars: 4, inventory: 3, dept: 'IM' },
            { id: 2, title: "電路學與電子學 (第三版)", course: "電工學", teacher: "王老師", version: "2018", price: 200, condition: 'B', stars: 3, inventory: 1, dept: 'EEE' },
            { id: 3, title: "資料結構與演算法", course: "資工必修", teacher: "陳老師", version: "2022", price: 480, condition: 'S', stars: 5, inventory: 2, dept: 'CS' },
            { id: 4, title: "工程材料概論", course: "材料導論", teacher: "李教授", version: "2019", price: 100, condition: 'C', stars: 1, inventory: 5, dept: 'Materials' },
            { id: 5, title: "設計原理與應用", course: "視覺傳達", teacher: "林老師", version: "2023", price: 550, condition: 'A', stars: 4, inventory: 4, dept: 'Design' },
            { id: 6, title: "統計學與商業決策", course: "管理科學", teacher: "張教授", version: "2021", price: 320, condition: 'A', stars: 4, inventory: 0, dept: 'IM' }
        ];

        const bookListing = document.getElementById('book-listing');
        const mainSearch = document.getElementById('main-search');

        // --- 核心函數：渲染書籍卡片 ---
        function renderBookCard(book) {
            const isSoldOut = book.inventory === 0;
            const standard = conditionStandards[book.condition];

            const card = document.createElement('a');
            card.className = `book-card ${isSoldOut ? 'sold-out' : ''}`;
            card.setAttribute('data-id', book.id);
            card.onclick = (e) => {
                e.preventDefault();
                if (!isSoldOut) {
                    // 這裡應呼叫 openBookDetail(book.id);
                    alert(`點擊書籍 ID: ${book.id} - 進入詳細頁，書況為 ${standard.name}`);
                } else {
                    alert('抱歉，此書已售罄！');
                }
            };
            
            card.innerHTML = `
                <div class="book-title">${book.title}</div>
                <div class="book-info">課程：${book.course} (${book.teacher})</div>
                <div class="price-status">
                    <span class="book-price">${isSoldOut ? '已售罄' : `$${book.price}`}</span>
                    <span class="condition-tag ${standard.color}">${book.condition} 級</span>
                </div>
                <div class="inventory" style="${isSoldOut ? 'color: grey; background: #f0f0f0;' : ''}">
                    ${isSoldOut ? '無庫存' : `剩餘庫存：${book.inventory}`}
                </div>
            `;
            bookListing.appendChild(card);
        }

        // --- 沿用搜尋、初始化和分類邏輯 ---
        function initializeListing(books = mockBooks) {
            bookListing.innerHTML = '';
            books.forEach(renderBookCard);

            if (books.length === 0) {
                bookListing.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; margin-top: 2rem; color: var(--text-light);">找不到符合條件的書籍。</p>';
            }
        }
        
        function handleSearch() {
            const query = mainSearch.value.trim().toLowerCase();
            const filteredBooks = mockBooks.filter(book => 
                book.title.toLowerCase().includes(query) ||
                book.course.toLowerCase().includes(query) ||
                book.teacher.toLowerCase().includes(query)
            );
            initializeListing(filteredBooks);
        }

        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                let filtered = mockBooks.filter(book => book.dept === category);
                initializeListing(filtered);
            });
        });

        // 啟動網站
        window.onload = () => initializeListing();

        // 範例：顯示評級標準的彈窗 (可以替換成您自己的 Modal 或新頁面)
        document.querySelector('a[href="❓ 二手書評級標準"]').addEventListener('click', function(e) {
            e.preventDefault();
            let standardsText = "--- 烈焰風暴骰子牛 二手書評級標準 ---\n\n";
          
