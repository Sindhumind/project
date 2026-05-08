  export function Table() {
  return `
    <div id="reg-table">
        <h2>Registered Users</h2>

        <input type="text" id="search-input" placeholder="Search...">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                            <span class="sort-container">
                            <i id="asc-0" class="fa-solid fa-sort-up sort-icon" onclick="sortTable(0, 'asc')" style="line-height: 0.4;"></i>
                            <i id="desc-0" class="fa-solid fa-sort-down sort-icon" onclick="sortTable(0, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>

                        <th>
                            Email
                            <span class="sort-container">
                                <i id="asc-1" class="fa fa-sort-up sort-icon" onclick="sortTable(1, 'asc')" style="line-height: 0.4;"></i>
                                <i id="desc-1" class="fa fa-sort-down sort-icon" onclick="sortTable(1, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>

                        <th>
                            Phone
                            <span class="sort-container"></i>
                                <i id="asc-2" class="fa fa-sort-up sort-icon" onclick="sortTable(2, 'asc')" style="line-height: 0.4;"></i>
                                <i id="desc-2" class="fa fa-sort-down sort-icon" onclick="sortTable(2, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>

                        <th>
                            Gender
                            <span class="sort-container"></i>
                                <i id="asc-3" class="fa fa-sort-up sort-icon" onclick="sortTable(3, 'asc')" style="line-height: 0.4;"></i>
                                <i id="desc-3" class="fa fa-sort-down sort-icon" onclick="sortTable(3, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>
                        <th id = "action-column">Actions</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>
            </table>
        </div>
    </div>`;

  }