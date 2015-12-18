jQuery(document).ready(function () {
	//define Periodic struct 
	var Periodic = function(atomicNumber,name,chineseName,standardAtomicWeight) {
		this.atomicNumber = atomicNumber;
		this.name = name;
		this.chineseName = chineseName;
		this.standardAtomicWeight = standardAtomicWeight;
		this.backgroundColor = "skyblue";
	};

	//add change color method
	Periodic.prototype.setbackgroundColor = function (color){
		this.backgroundColor=color;
	}

	//defind Periodic content
	var periodicTable = [];
	var nameList = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Uut","Fl","Uup","Lv","Uus","Uuo"];
	var chineseNameList = ["氫","氦","鋰","鈹","硼","碳","氮","氧","氟","氖","納","鎂","鋁","矽","磷","硫","氯","氬","鉀","鈣","鈧","鈦","釩","鉻","錳","鐵","鈷","鎳","銅","鋅","鎵","鍺","砷","硒","溴","氪","銣","鍶","釔","鋯","鈮","鉬","鎝","釕","銠","鈀","銀","鎘","銦","錫","銻","碲","碘","氙","銫","鋇","鑭","鈰","鐠","釹","鉕","釤","銪","釓","鋱","鏑","鈥","鉺","銩","鐿","鎦","鉿","鉭","鎢","錸","鋨","銥","鉑","金","汞","鉈","鉛","鉍","釙","砈","氡","鍅","鐳","錒","釷","鏷","鈾","錼","鈽","鋂","鋦","鉳","鉲","鑀","鐨","鍆","鍩","鐒","鑪","𨧀","𨭎","𨨏","𨭆","䥑","鐽","錀","鎶","<br>","鈇","<br>","鉝","<br>","<br>"];
	var SAWList = [1.008,4.003,6.941,9.012,10.81,12.01,14.01,16.00,19.00,20.18,22.99,24.31,26.98,28.09,30.97,32.07,35.45,39.95,39.1,40.08,44.96,47.88,50.94,52.00,54.94,55.85,58.93,58.69,63.55,65.39,69.72,72.59,74.92,78.96,79.90,83.80,85.47,87.62,88.91,91.22,92.91,95.94,97.91,101.1,102.9,106.4,107.9,112.4,114.8,118.7,121.8,127.6,126.7,131.3,132.9,137.3,138.9,140.1,140.9,144.2,144.9,150.4,152.0,157.3,158.9,162.5,164.9,167.3,168.9,173.0,175.0,178.5,180.9,183.9,186.2,190.2,192.2,195.1,197.0,200.6,204.4,207.2,209.0,209.0,210.0,222.0,223.0,226.0,227.0,232.0,231.0,238.0,237.1,244.1,243.1,247.1,241.1,252.1,252.1,257.1,258.1,259.1,262.1,265.1,268.1,271.1,270.1,277.2,276.2,281.2,280.2,285.2,284.2,289.2,288.2,293.2,294.2,294.2];
	
	//define BackGroundColor
	var BGColor = [
		Nonmetal = {
			atomicNumber : [1,6,7,8,15,16,34],
			BGColor : "#A0FFA0"
		},
		AlkaliMetal = {
			atomicNumber : [3,11,19,37,55,87],
			BGColor : "#FF6666"
		},
		AlkaliEarthMetal = {
			atomicNumber : [4,12,20,38,56,88],
			BGColor : "#FFDEAD"
		},
		Metalloid = {
			atomicNumber : [5,14,32,33,51,52],
			BGColor : "#CCCC99"
		},
		Halogen = {
			atomicNumber : [9,17,35,53,85],
			BGColor : "#FFFF99"
		},
		NobleGas = {
			atomicNumber : [2,10,18,36,54,86],
			BGColor : "#C0FFFF"
		},
		PostTransitionMetal = {
			atomicNumber : [13,31,49,50,81,82,83,84,114],
			BGColor : "#CCCCCC"
		},
		TransitionMetal = {
			atomicNumber : [21,22,23,24,25,26,27,28,29,30,39,40,41,42,43,44,45,46,47,48,72,73,74,75,76,77,78,79,80,104,105,106,107,108,112],
			BGColor : "#FFC0C0"
		},
		Lanthanide = {
			atomicNumber : [57,58,59,60,61,62,63,64,65,66,67,68,69,70,71],
			BGColor : "#FFBFFF"
		},
		Actinide = {
			atomicNumber : [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103],
			BGColor : "#FF99CC"
		},
		Unknown = {
			atomicNumber : [109,110,111,113,115,116,117,118],
			BGColor : "#E8E8E8"
		}
	];

	//bulid periodicTable
	var bulidPeriodicTable = function (){	
		for (var i = 0;i<nameList.length;i++){
			periodicTable.push(new Periodic(i+1,nameList[i],chineseNameList[i],SAWList[i]));
		}
	}

	//set BackGroundClolr 
	var setbackgroundColor = function (){
		for (var index in BGColor){
			for (var index2 in BGColor[index].atomicNumber){
				periodicTable[parseInt(BGColor[index].atomicNumber[index2]-1)].setbackgroundColor(BGColor[index].BGColor);
			}	
		}
	}
	
	var space = "<li id ='nonHandle' class=space></li>"
	var putSpaceBeginAtomic = [1,4,12,118,71];  
	var putSpaceNumber = [16,10,10,20,3];
    var Row = 1;

    //put empty Element 
	var putSpace = function (i){
		for(var index in putSpaceBeginAtomic){
			if(i == putSpaceBeginAtomic[index]){
				for (var j = 0; j < putSpaceNumber[Row-1]; j++) {
					$("#sortable").append(space);
				};
				putSpaceBeginAtomic.splice(index,1);
				Row++;
				break;
			}
		}
	}
	
	var anothorElement = function(Color,id,content1,content2){
		var atomicHtml = 
		"<li style='background-color:"+Color+";' id='"+id+"' class='Element'>\
			<p id='atomicNumber' class='text'>"+content1+"</p>\
	        <p id='chineseName' class='text'>"+content2+"</p>\
	     </li>";
		$("#sortable").append(atomicHtml);
	}
	
	var writePeriodicTableToHtml = function(i){
		var atomicHtml = 
		"<li style='background-color:"+periodicTable[i-1].backgroundColor+";'id='atomic"+i+"' class='Element'>\
			<p id='atomicNumber' class='text'>"+periodicTable[i-1].atomicNumber+"</p>\
	        <p id='name' class='text'>"+periodicTable[i-1].name+"</p>\
	        <p id='chineseName' class='text'>"+periodicTable[i-1].chineseName+"</p>\
	        <p id='standardAtomicWeight' class='text'>"+periodicTable[i-1].standardAtomicWeight+"</p>\
	     </li>";
		$("#sortable").append(atomicHtml);
	    putSpace(i);	
	}

	var main = function (){
		bulidPeriodicTable();
		setbackgroundColor();
		for (var i = 1;i <= 56; i++){	
			writePeriodicTableToHtml(i);		
		}
		anothorElement("#FFBFFF","lanthanide","57-71<br><br>","鑭系<br><br>元素");
		for (var i = 72;i <= 88; i++){	
			writePeriodicTableToHtml(i);		
		}
		anothorElement("#FF99CC","actinide","89-103<br><br>","錒系<br><br>元素");
		for (var i = 104;i <= 118; i++){	
			writePeriodicTableToHtml(i);		
		}
		for (var i = 57;i <= 71; i++){	
			writePeriodicTableToHtml(i);		
		}
		for (var i = 89;i <= 103; i++){	
			writePeriodicTableToHtml(i);		
		}
	}
	
	main();

	$("#sortable").sortable({
		containment : 'parent',
		revert : true,
		handle : $(".Element"),
	});


});

