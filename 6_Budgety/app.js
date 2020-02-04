// BUDGET CONTROLLER 
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        budget: 0,
        percentage: -1,
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type == "inc") {
                newItem = new Income(id, des, val);
            } else {
                newItem = new Expense(id, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (el) {
                return el.id;
            });
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },
        calculateBudget: function () {
            // 1. Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // 2. Calculate budget
            data.budget = data.totals.inc - data.totals.exp;

            // 3. Calculate the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },
        calculatePercentages: function () {
            data.allItems.exp.forEach(function (exp) {
                exp.calcPercentage(data.totals.inc);
            });
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        getPercentages: function () {
            return data.allItems.exp.map(function (exp) {
                return exp.percentage;
            });
        },
        testing: function () {
            return data;
        }
    };

})();


// UI CONTROLLER 
var uiController = (function () {

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        budgetIncomeLabel: ".budget__income--value",
        budgetExpenseLabel: ".budget__expenses--value",
        budgetExpensePercentage: ".budget__expenses--percentage",
        container: ".container",
        expensePercentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };

    var formatNumber = function (number, type) {
        var splitNum, int, dec;
        number = Math.abs(number);
        number = number.toFixed(2);
        splitNum = number.split('.');
        int = splitNum[0];
        dec = splitNum[1];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        }

        return (type === 'inc' ? '+' : '-') + ' ' + int + '.' + dec;
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMstrings: function () {
            return DOMstrings;
        },
        clearFields: function () {
            var fields;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (field) {
                field.value = "";
            });

            fieldsArray[0].focus();
        },
        changedType: function () {
            var fields = document.querySelectorAll(DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            var button = document.querySelector(DOMstrings.inputButton);

            fields.forEach(function (current) {
                current.classList.toggle('red-focus');
            });

            button.classList.toggle('red');
        },
        displayBudget: function (budget) {

            var type = budget.budget >= 0 ? 'inc' : 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(budget.budget, type);
            document.querySelector(DOMstrings.budgetIncomeLabel).textContent = formatNumber(budget.totalInc, 'inc');
            document.querySelector(DOMstrings.budgetExpenseLabel).textContent = formatNumber(budget.totalExp, 'exp');

            if (budget.percentage > 0) {
                document.querySelector(DOMstrings.budgetExpensePercentage).textContent = budget.percentage + '%';
            } else {
                document.querySelector(DOMstrings.budgetExpensePercentage).textContent = '---';
            }
        },
        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensePercentageLabel);

            fields.forEach(function (currentElement, index) {
                if (percentages[index] > 0) {
                    currentElement.textContent = percentages[index] + '%';
                } else {
                    currentElement.textContent = '---';
                }
            });
        },
        displayMonth: function () {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var now, year, month;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = monthNames[month] + ' ' + year;
        },
        addListItem: function (item, type) {
            var htmlString, container;
            // 1. Create HTML String with placeholder text

            if (type == "inc") {
                container = document.querySelector(DOMstrings.incomeContainer);
                htmlString =
                    `<div class="item clearfix" id="inc-%id%">
                        <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
            } else if (type === "exp") {
                container = document.querySelector(DOMstrings.expenseContainer);
                htmlString =
                    `<div class="item clearfix" id="exp-%id%">
                        <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__percentage">??</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
            }

            // 2. Replace placeholder with actual data
            htmlString = htmlString.replace('%id%', item.id);
            htmlString = htmlString.replace('%description%', item.description);
            htmlString = htmlString.replace('%value%', formatNumber(item.value, type));

            // 3. Insert HTML into the DOM
            container.insertAdjacentHTML("beforeend", htmlString);
        },
        deleteListItem: function (selectorId) {
            var element = document.querySelector('#' + selectorId);
            element.parentNode.removeChild(element);
        }
    };

})();

// GLOBAL APP CONTROLLER 
var appController = (function (budgetCtrl, uiCtrl) {

    var setupEventListeners = function () {
        var DOM = uiCtrl.getDOMstrings();
        document.querySelector(DOM.inputButton).addEventListener('click', createNewItem);

        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' || event.code === 'Enter') createNewItem();
        });

        document.querySelector(DOM.container).addEventListener('click', removeItem);

        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changedType);
    };

    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget
        uiCtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        // 1. Calculate the percentages
        var percentages = budgetCtrl.calculatePercentages();

        // 2. Get the percentages
        var percentages = budgetCtrl.getPercentages();

        // 3. Update user interface
        uiCtrl.displayPercentages(percentages);
    };

    var createNewItem = function () {
        var input, newItem;
        // 1. Get the filled input data
        input = uiCtrl.getInput();

        if (input.description !== "" && !isNaN(input.value)) {

            // 2. Add item rto the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add new item to the UI
            uiCtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            uiCtrl.clearFields();

            // 5. Update the budget
            updateBudget();

            // 6. Update percentages
            updatePercentages();
        }
    };

    var removeItem = function (event) {
        var itemId;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            var splitId, type, id;
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);

            // 1. Delete item from data structure
            budgetCtrl.deleteItem(type, id);

            // 2. Delete item from UI
            uiCtrl.deleteListItem(itemId);

            // 3. Update budget
            updateBudget();

            // 4. Update percentages
            updatePercentages();
        }
    };

    return {
        init: function () {
            setupEventListeners();
            uiCtrl.displayBudget(
                {
                    budget: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                }
            );
            uiCtrl.displayMonth();
        }
    };

})(budgetController, uiController);

appController.init();