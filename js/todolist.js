var todoData = [
  {
    id: 1,
    todoName: '吃饭',
    isDone: true
  },
  {
    id: 2,
    todoName: '睡觉',
    isDone: true
  },
  {
    id: 3,
    todoName: '敲代码',
    isDone: false
  },
  {
    id: 4,
    todoName: '看电视',
    isDone: true
  },
]

var oMain = document.querySelector('.todo-main');
var oAllSpan = document.querySelectorAll('.todo-main>li>label>span');
var oAllChecked = document.querySelector('.todo-footer>label>input');
var oAllIpt = document.querySelectorAll('.todo-main>li>label>input');
var oDelIpt = document.querySelectorAll('.todo-main .btn-danger');
var oDelChecked = document.querySelector('.todo-footer .btn-danger');



render();

//创建完元素,判断数组的isDone  如果是true 则给span添加划线
listDoc();
//修改全部和已完成的个数
itemNum()


// 点击回车添加数据
var oIpt = document.querySelector('.todo-header>input');
oIpt.onkeyup = function (e) {
  if (e.keyCode === 13) {
    var oIptValue = oIpt.value;
    //清空表单
    oIpt.value = '';
    //给页面添加项目
    var newLi = document.createElement('li');
    var str = `<label>
      <input type="checkbox" />
      <span>${oIptValue}</span>
      </label>
      <button class="btn btn-danger">删除</button>`;
    newLi.innerHTML = str;
    oMain.appendChild(newLi);
    //把改变的页面数据传给数组
    listData();
    // 判断全选是否选中
    allChecked()
    // console.log(todoData);
    //修改全部和已完成的个数
    itemNum()
    isShow();
  }
}


//点击表单复选框按钮 添加样式
//因为有新添加的元素  得利用事件委托
oMain.onclick = function (e) {
  var oAllIpt = document.querySelectorAll('.todo-main>li>label>input');
  if (e.target.nodeName.toLowerCase() === 'input') {
    if (e.target.checked) {
      e.target.nextElementSibling.classList.add('done');
    } else {
      e.target.nextElementSibling.classList.remove('done');
    }
    listData();
    // render()
    allChecked()
    // console.log(todoData);
    //修改全部和已完成的个数
    itemNum()
  }

  //点击删除按钮 
  //因为也要给新添加的元素绑定事件 所以得使用事件委托
  if (e.target.nodeName.toLowerCase() === 'button') {
    listDoc();
    //删除数组中的当前对象
    //获取点击的是第几个button  方法: 给每个点击按钮添加自定义属性 index 和数组index相对应
    var oDelIndex = e.target.dataset.index;
    //删除数组中下标为oDelIndex的元素
    todoData.splice(oDelIndex, 1);
    render();
    listDoc();
    // console.log(todoData);
    //删除当前点击的项目  目标事件的父元素
    // e.target.parentNode.remove();
    //判断是否还有项目 没有显示h2标签
    isShow();
    //修改全部和已完成的个数
    itemNum()
  }
}

//点击全选按钮
oAllChecked.onclick = function () {
  console.log(todoData);
  // 把数据里的isDone修改为true
  var _this = this;
  todoData.forEach(function (item) {
    //把全选框的选中状态赋值给数组中的isDone  修改数组
    item.isDone = _this.checked;
    //把数组数据渲染给页面上
    listDoc();
  })
  //修改全部和已完成的个数
  itemNum()
}

// oMain.onclick = function (e) {
// }//如果还需要事件委托不能再给父元素绑定点击事件 会覆盖上面的绑定的事件函数

//点击清空所有已完成任务 清空被选中的项目
oDelChecked.onclick = function () {
  //获取被选中的元素
  var oCheckedIpt = document.querySelectorAll('.todo-main li input:checked');
  // 删除被选中的元素
  oCheckedIpt.forEach(function (item) {
    item.parentElement.parentElement.remove()
  })
  listData();
  itemNum();
  isShow();
  console.log(todoData);
}