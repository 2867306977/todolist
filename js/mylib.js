//把页面的数据传给数组
function listData() {
  //在添加前清空上一次的数据
  todoData.length = 0;
  var oMainList = document.querySelectorAll('.todo-main>li');
  oMainList.forEach(function (item, index) {
    //给数组添加数据 
    var newObj = {
      id: index + 1,
      todoName: item.children[0].children[1].textContent,
      isDone: item.children[0].children[0].checked
    };
    todoData.push(newObj);
  })
}

//把数组的数据传给到页面上
function listDoc() {
  var oAllIpt = document.querySelectorAll('.todo-main>li>label>input');
  var oAllSpan = document.querySelectorAll('.todo-main>li>label>span');
  var oDelIpt = document.querySelectorAll('.todo-main .btn-danger');
  //获取数组的数据渲染到页面上
  todoData.forEach(function (item, index) {
    //数组中的todoName 赋值给项目的名称
    oAllSpan[index].textContent = item.todoName;
    oAllIpt[index].checked = item.isDone
    //给对应的删除按钮绑定一个自定义属性
    oDelIpt[index].dataset.index = index;
    //判断数组的isDone  如果是true 则给span添加划线
    if (item.isDone) {
      oAllIpt[index].nextElementSibling.classList.add('done');
    } else {
      oAllIpt[index].nextElementSibling.classList.remove('done');
    }
  })
}

//全选框是否需要选中
function allChecked() {
  var oAllChecked = document.querySelector('.todo-footer>label>input');
  //获取全部项目的数量
  var allItems = document.querySelectorAll('.todo-main>li input');
  var allCheckedItems = document.querySelectorAll('.todo-main>li input:checked');
  // console.log(allCheckedItems);
  // console.log(allItems);
  //如果长度相等那么全选选中
  oAllChecked.checked = allCheckedItems.length === allItems.length;
}

//判断列表中是否还有项目如果没有那么就显示h2标签
function isShow() {
  var oMain = document.getElementsByClassName('todo-main')[0];
  var oH2 = document.querySelector('.todo-main >h2');
  var oFooter = document.querySelector('.todo-footer');
  //因为true就移除 此时还没给oMain添加h2元素 所以报错 解决办法 html结构添加h2标签把他隐藏起来 没有项目则显示出来
  if (todoData.length) {
    oH2.style.display = 'none';
    //todo-footer显示
    oFooter.style.display = 'block'
  } else {
    oH2.style.display = 'block'
    oFooter.style.display = 'none'
  }
}

//获取数组的数据创建元素 渲染到页面上
function render() {
  var oMain = document.querySelector('.todo-main');
  //渲染之前把上次渲染的删除
  oMain.innerHTML = '';
  //获取数组的数据然后创建元素 渲染页面上
  todoData.forEach(function (item) {
    if (item.isDone) {
      var str = `<li>
    <label>
    <input type="checkbox" checked />
    <span>${item.todoName}</span>
    </label>
    <button class="btn btn-danger">删除</button>
    </li>
    `
    } else {
      var str = `<li>
    <label>
    <input type="checkbox" />
    <span>${item.todoName}</span>
    </label>
    <button class="btn btn-danger">删除</button>
    </li>`
    }
    oMain.innerHTML += str;
    // console.log(item.isDone);
  })
  var newH2 = document.createElement('h2');
  newH2.innerHTML = '恭喜你没有任务';
  oMain.appendChild(newH2);
}

//修改全部的个数和已完成个数
function itemNum() {
  var allNum = document.querySelector('.todo-footer>span>i');
  var checkedNum = document.querySelector('.todo-footer>span>span>i');
  //数组有多少个就项目有多少个
  allNum.innerHTML = todoData.length
  //isDone为true的有多少个就有多少个checkedNum
  var count = 0;
  todoData.forEach(function (item) {
    if (item.isDone) {
      count++;
    }
  })
  checkedNum.innerHTML = count;
}