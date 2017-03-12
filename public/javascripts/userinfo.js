var selections = [];
var userinfo=$('#user-info');
//初始化bootstrap-table
userinfo.bootstrapTable({
    dataType: 'json',
    url: 'http://localhost:3000/getAllUserInfos',         //请求后台的URL（*）
    method: 'POST',                      //请求方式（*）
    toolbar: '#toolbar',                //工具按钮用哪个容器
    striped: true,                      //是否显示行间隔色
    cache: false,
    pagination: true,                   //是否显示分页（*）
    sidePaination:"server",
    pageSize:10,
    pageList:[5,10,15,20,25],
    sortable: false,                     //是否启用排序
    sortOrder: "asc",                   //排序方式
    queryParams: null,//传递参数（*）
    search: true,
    strictSearch: true,
    showColumns: true,                  //是否显示所有的列
    showRefresh: true,                  //是否显示刷新按钮
    minimumCountColumns: 2,             //最少允许的列数
    clickToSelect: false,                //是否启用点击选中行
    height: 600,
    showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
    cardView: false,                    //是否显示详细视图
    detailView: false,                   //是否显示父子表
    columns: [{
        field: 'state',
        checkbox: true
    }, {
        field: 'userId',
        title: '用户ID'
    }, {
        field: 'userAvatar',
        title: '头像',
        align:'center',
        formatter:function (value,row,index) {
            return '<img src="'+value+'" class="img-rounded" height="36" width="36">';
        }
    }, {
        field: 'userNickName',
        title: '昵称'
    }, {
        field: 'userSex',
        title: '性别'
    }, {
        field: 'userBirth',
        title: '出生日期',
        formatter:formatDate
    }, {
        field: 'userPhone',
        title: '电话'
    }, {
        field: 'userAddress',
        title: '联系地址'
    }, {
        field: 'userSchool',
        title: '大学'
    }, {
        field: 'userOrganization',
        title: '社团'
    }, {
        field: 'userLevel',
        title: '等级'
    },  {
        field: 'userFocus',
        title: '关注的事物'
    }, {
        field: 'userLabel',
        title: '标签'
    }, {
        field: 'userFavor',
        title: '兴趣'
    }, {
        field: 'userSkill',
        title: '等级'
    }, {
        field: 'userStatus',
        title: '状态'
    },{
        field: 'operate',
        title: '基本操作',
        formatter: function(value, row, index) {
            var r='<a class="remove" href="#"  title="Remove" onclick="onRemove(\''+row.userId+'\')">删除用户</a>';
            var c='<a class="alert" href="#"  title="Change" data-toggle="modal" data-target="#altermodal" onclick="onAlter(\''+row.userId+'\')">修改用户</a>';
            return r+c;
        }
    }]
});
userinfo.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
    $('#remove').prop('disabled',!$('#user-info').bootstrapTable('getSelections').length);
    selections = getIdSelections();
});
$('#remove').click(function () {
    var userId = getIdSelections();
    if(confirm("确认删除这些用户，注意不可以恢复!！")){
        var userIds=userId.join(",");
        $.post("deleteCheckedUser",{userIds:userIds},function (result) {
            if(result)
            {
                userinfo.bootstrapTable('remove', {
                    field: 'userId',
                    values: userId
                });
                $('#remove').prop('disabled', true);
            }
        });
    }

});
$(window).resize(function () {
    userinfo.bootstrapTable('resetView', {
        height: getHeight()
    });
});

function getIdSelections() {
    return $.map(userinfo.bootstrapTable('getSelections'), function (row) {
        return row.userId;
    });
}

//注册用户
function registerUserinfo() {
    //获取注册用户信息的表单
    var registerUserInfoForm=$("#registerUserInfoForm");
    //首先验证表单里面的数据格式是否正确，不正确会有相应的提示
    // registerUserInfoForm.data("bootstrapValidator").validate();
    // if(!registerUserInfoForm.data("bootstrapValidator").isValid()){
    //     return;
    // }
    //在正确的情况下向后台请求注册用户信息
    $.post("registerUserInfo",registerUserInfoForm.serialize(),function (result) {
        alert(result);
    });
    $("#addmodal").modal("hide");
}

//日期格式化
function formatDate(value,index,row) {
    var date=new Date(value);
    return date.toLocaleString();
}
//更新用户
function alteruser() {
    var alterUserForm=$("#alterUserForm");
    alterUserForm.data("bootstrapValidator").validate();
    if(!alterUserForm.data("bootstrapValidator").isValid()){
        return;
    }
    $.post("alterNewUser",alterUserForm.serialize(),function (result) {
        if(result)
            alert("修改用户成功！");
        else
             alert("修改用户失败！")
    });
    $("#altermodal").modal("hide");
}
//删除用户
function onRemove(userId) {
    $.post("deleteUser",{userId:userId},function (result) {
        if(result)
            $('#user-info').bootstrapTable('remove', {
                field: 'userId',
                values: [parseInt(userId)]
            });
    });
}
//点击修改用户按钮，自动填充模态框
function onAlter(userId) {

    $.ajax({
        type:"POST",
        url:"findUserInfoByUserId",
        data:{userId:userId},
        dataType:"json",
        success:function(result){
            $("#userid").val(userId);
            $("#alterusernickname").val(result[0].userNickName);
            $("#olduserpassword").val(result[0].userPassword);
            //设置勾选框
            var radioValue=result[0].userSex;
            if("male"==radioValue)
                $("#radiomale").attr("checked",true);
            else
                $("#radiofemale").attr("checked",true);
            $("#alteruseravatar").val(result[0].userAvatar);
            var birthday=new Date(result[0].userBirth);
            //格式化日期
            var year=birthday.getFullYear();
            var month=birthday.getMonth();
            var day=birthday.getDate();
            if(month<10)
                month="0"+(month+1);
            if(day<10)
                day="0"+day;
            $("#alteruserbirth").val(year+"-"+month+"-"+day);
            $("#alteruserphone").val(result[0].userPhone);
            $("#alteruseraddress").val(result[0].userAddress);
            $("#alteruserschool").val(result[0].userSchool);
            $("#alteruserorganization").val(result[0].userOrganization);
            $("#alteruserfocus").val(result[0].userFocus);
            $("#alteruserlabel").val(result[0].userLabel);
            $("#alteruserfavor").val(result[0].userFavor);
            $("#alteruserskill").val(result[0].userSkill);
            $("#alterusersafequestion").val(result[0].userSafeQuestion.question);
            $("#alterusersafeanswer").val(result[0].userSafeQuestion.answer);
        }
    });
}
//为勾选框加载数据
//这里要注意 不能再填写依赖[]，因为前面已经有了一个[]依赖，否则数据不能显示
angular.module('currentUser').controller('addUserController',function ($scope,$http) {
    $http.get('/getUserSkills').success(function (res) {
        $scope.userSkills=res;
    });
 });
//设置添加用户表单格式
$("#addUserForm").bootstrapValidator({
    message:"提交数据不能全部为空！！",
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        usernickname:{
            message:"用户名验证失败！",
            validators:{
                notEmpty:{
                    message:"昵称不能为空！"
                },
                stringLength:{
                    min:3,
                    max:12,
                    message:"昵称长度必须在3到12位之间"
                },
                regexp:{
                    regexp:/^([a-zA-Z0-9]|[\u4E00-\u9FA5])+$/,
                    message:"昵称只能包含大写、小写、数字和汉字"
                }
            }
        },
        userpassword:{
            message:"密码验证失败！",
            validators: {
                notEmpty: {
                    message: "密码不能为空！"
                },
                stringLength: {
                    min: 6,
                    max: 20,
                    message: "密码长度必须在6到20位之间"
                }
            }
        },
        ensureuserpassword: {
            message: "确认密码验证失败！",
            validators: {
                notEmpty: {
                    message: "确认密码不能为空！"
                },
                identical: {
                    field: "userpassword",
                    message: "两次密码输入不一致！"
                }
            }
        },
        useravatar:{
            message:"头像路径验证失败！",
            validators:{
                notEmpty:{
                    message:"头像路径不能为空！"
                }
            }
        },
        userbirth:{
            message:"出生日期验证失败！",
            validators:{
                notEmpty:{
                    message:"出生日期不能为空！"
                }
            }
        },
        userphone:{
            message:"电话号码验证失败！",
            validators:{
                notEmpty:{
                    message:"电话号码不能为空！"
                },
                stringLength:{
                    min:11,
                    max:11,
                    message:"请填写11位的手机号码！"
                },
                regexp:{
                    regexp:/^1\d{10}$/,
                    message:"请输入11位的手机号码！！"
                }
            }
        }
//                useraddress:{
//                      message:"地址验证失败！",
//                      validators:{
//                          notEmpty:{
//                              message:"地址不能为空！"
//                          }
//                      }
//                },
//                userschool:{
//                    message:"大学验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"大学不能为空！"
//                        }
//                    }
//                },
//                userorganization:{
//                    message:"社团验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"社团不能为空！"
//                        }
//                    }
//                },
//                userfocus:{
//                    message:"关注事物验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"关注事物不能为空！"
//                        }
//                    }
//                },
//                userlabel:{
//                    message:"标签验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"标签不能为空！"
//                        }
//                    }
//                },
//                userfavor:{
//                    message:"兴趣验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"兴趣不能为空！"
//                        }
//                    }
//                },
//                userskill:{
//                    message:"技能验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"技能不能为空！"
//                        }
//                    }
//                },
//                usersafequestion:{
//                    message:"安全问题验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"安全问题不能为空！"
//                        }
//                    }
//                },
//                usersafeanswer:{
//                    message:"安全回答验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"安全回答不能为空！"
//                        }
//                    }
//                }

    }
});
$("#alterUserForm").bootstrapValidator({
    message:"提交数据不能全部为空！！",
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        usernickname:{
            message:"用户名验证失败！",
            validators:{
                notEmpty:{
                    message:"昵称不能为空！"
                },
                stringLength:{
                    min:3,
                    max:12,
                    message:"昵称长度必须在3到12位之间"
                },
                regexp:{
                    regexp:/^([a-zA-Z0-9]|[\u4E00-\u9FA5])+$/,
                    message:"昵称只能包含大写、小写、数字和汉字"
                }
            }
        },
        userpassword:{
            message:"密码验证失败！",
            validators: {
                notEmpty: {
                    message: "密码不能为空！"
                },
                stringLength: {
                    min: 6,
                    max: 20,
                    message: "密码长度必须在6到20位之间"
                }
            }
        },
        ensureuserpassword: {
            message: "确认密码验证失败！",
            validators: {
                notEmpty: {
                    message: "确认密码不能为空！"
                },
                identical: {
                    field: "userpassword",
                    message: "两次密码输入不一致！"
                }
            }
        },
        useravatar:{
            message:"头像路径验证失败！",
            validators:{
                notEmpty:{
                    message:"头像路径不能为空！"
                }
            }
        },
        userbirth:{
            message:"出生日期验证失败！",
            validators:{
                notEmpty:{
                    message:"出生日期不能为空！"
                }
            }
        },
        userphone:{
            message:"电话号码验证失败！",
            validators:{
                notEmpty:{
                    message:"电话号码不能为空！"
                },
                stringLength:{
                    min:11,
                    max:11,
                    message:"请填写11位的手机号码！"
                },
                regexp:{
                    regexp:/^1\d{10}$/,
                    message:"请输入11位的手机号码！！"
                }
            }
        }
//                useraddress:{
//                      message:"地址验证失败！",
//                      validators:{
//                          notEmpty:{
//                              message:"地址不能为空！"
//                          }
//                      }
//                },
//                userschool:{
//                    message:"大学验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"大学不能为空！"
//                        }
//                    }
//                },
//                userorganization:{
//                    message:"社团验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"社团不能为空！"
//                        }
//                    }
//                },
//                userfocus:{
//                    message:"关注事物验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"关注事物不能为空！"
//                        }
//                    }
//                },
//                userlabel:{
//                    message:"标签验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"标签不能为空！"
//                        }
//                    }
//                },
//                userfavor:{
//                    message:"兴趣验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"兴趣不能为空！"
//                        }
//                    }
//                },
//                userskill:{
//                    message:"技能验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"技能不能为空！"
//                        }
//                    }
//                },
//                usersafequestion:{
//                    message:"安全问题验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"安全问题不能为空！"
//                        }
//                    }
//                },
//                usersafeanswer:{
//                    message:"安全回答验证失败！",
//                    validators:{
//                        notEmpty:{
//                            message:"安全回答不能为空！"
//                        }
//                    }
//                }

    }
});
var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
var pieChart = new Chart(pieChartCanvas);
var PieData = [
    {
        value: 30,
        color: "#f56954",
        highlight: "#f56954",
        label: "女士"
    },
    {
        value: 70,
        color: "#00a65a",
        highlight: "#00a65a",
        label: "男士"
    }
];
var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,
    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth: 2,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 50, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps: 100,
    //String - Animation easing effect
    animationEasing: "easeOutBounce",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: true,
    //Boolean - whether to make the chart responsive to window resizing
    responsive: true,
    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: false
};
//Create pie or douhnut chart
// You can switch between pie and douhnut using the method below.
pieChart.Doughnut(PieData, pieOptions);