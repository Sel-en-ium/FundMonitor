/*globals $*/

/**
 * Used to gather the fund Ids by table.
 */
var
  i,
  j,
  temp = '',
  entries,
  list = [],
  allTables = $('table'),
  selectedTables = [];


for (i = 0; i < allTables.length; i += 1) {
  if ($(allTables[i]).find('tr.headerRow2>th:nth-of-type(2)')[0].innerHTML.match(/price/i)) {
    selectedTables.push(allTables[i]);
  }
}

for (i = 0; i < selectedTables.length; i += 1) {
  entries = $(selectedTables[i]).find('tr.tabularData1>td:nth-of-type(2)>script');
  entries.append($(selectedTables[i]).find('tr.tabularData2>td:nth-of-type(2)>script'));
  for (j = 0; j < entries.length; j += 1) {
    temp = entries[j].innerHTML;
    temp = temp.substring(11, temp.indexOf('.'));
    list.push(temp);
  }
}
