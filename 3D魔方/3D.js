$(function(){
		var wrap = $('.wrapping');
		var cover = $('.cover'); 
		var indexAll = [];
		//blockPosArr
		var blockPosArr = [];
		var posSize = 50;
		var span = '';
		for(var i = 0;i<6;i++){
			blockPosArr.push([{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}])
			span+='<span></span>';
		}
		coverRotate();
		function coverRotate(){
			cover.each(function(index,item){
				for(var j = 0;j < 8;j++){
					$(item).append("<div class='block'></div>").find('.block').eq(j+1)
					.css({
						'left':blockPosArr[index][j].x * posSize + 'px',
						'top':blockPosArr[index][j].y * posSize + 'px'
					}).append(span);
				}
				indexAll.push({i:0})
				$(item).attr('index',index)
				.on('mousedown',mousedownRotate)
			})
		}
		function mousedownRotate(e){
			var parent = e.currentTarget;
			var index = $(parent).attr('index');
			var x = e.pageX;
			var y = e.pageY;

			$(this).on('mousemove',function(mem){
				// 向上或向左 + 45
				if(mem.pageX < x || mem.pageY < y){
					indexAll[index].i +=90;
				}else if(mem.pageX > x || mem.pageY > y){
					indexAll[index].i -=90;
				}
				$(parent).hover(function(){
					$(this).css({'zIndex':10});
				},function(){
					$(this).css({'zIndex':0});
				})
				var transProp;
				switch(index){
					case '0' : transProp = 'rotateX(90deg) translateZ(50px)' 
						break;
					case '1' : transProp = 'rotateX(90deg) translateZ(-50px)'
						break;
					case '2' : transProp = 'rotateY(90deg) translateZ(50px)'
						break;
					case '3' : transProp = 'rotateY(90deg) translateZ(-50px)'
						break;
					case '4' : transProp = 'translateZ(50px)'
						break;
					case '5' : transProp = 'translateZ(-50px)'
						break;
				}
				$(this).css({
					'transform': transProp + ' rotateZ(' + indexAll[index].i + 'deg)'
				}).off('mousemove');
			}).on('mouseup',function(e){
				$(this).off('mousemove');
			})
		}




	})



	document.oncontextmenu = function(){
		return false;
	}
	document.onselectstart = function(){
		return false;
	}