function listfiltering(result) {
    var listInput = getSkillList();
    listInput.forEach(function (e) {
        e.name = e.name.toLowerCase();
    });
    var orderList = [];
    Object.keys(result).forEach(function (key) {
        if (result[key] == 0) return;
        orderList.push({
            sentence: listInput.find((e) => { return e.name == key; }).descr,
            priority: result[key]
        });
    });
    var res = orderList.sort(function (a, b) { return b.priority - a.priority }).map((e) => { return e.sentence });
    return res;
}