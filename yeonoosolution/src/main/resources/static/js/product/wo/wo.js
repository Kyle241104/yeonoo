/**
 * 
 */
 
// date 타입 input 값 초기화 버튼
$(document).on('click', '.reset-input', e => {
	let elem = $(e.target).closest('.reset-input');
	let box = $(elem).closest('.wo-header-item-group');
	$(box).find('input').val('');
});

// 체크박스 stopPropagation
$(document).on('click', 'tbody th input[type="checkbox"]', e => {
	e.stopPropagation();
});

// 전체 선택 및 선택 해제
$(document).on('change', 'thead input[type="checkbox"]', e => {
	let elem = $(e.target).closest('input[type="checkbox"]');
	let checked = $(elem).prop('checked');
	let tbody = $(elem).closest('table').find('tbody');
	$(tbody).find('input[type="checkbox"]').prop('checked', checked);
});

// ROW 선택 시 액션
$(document).on('change', 'table.data-table input[type="checkbox"]', e => {
	let count = $('table.data-table input[type="checkbox"]').closest(':checked').length;
	if (count > 1 || count < 1) {
		$('.wo-header-value').find('select[name="workType"]').val('')
					   .end().find('input[name="workOrderDate"]').val('');
		return;
	}
	let tbody = $(e.target).closest('tbody');
	let data = {
		type: $(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').find('select[name="workType"]').val(),
		date: $(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').find('input[name="workOrderDate"]').val()
	};
	$('.wo-header-value').find('select[name="workType"]').val(data.type)
				   .end().find('input[name="workOrderDate"]').val(data.date);
});

// 테이블 셀 값 변경 시 더블클릭으로
$(document).on('dblclick', 'table.data-table th, table.data-table td', e => {
	let elem = $(e.target).closest('table.data-table th, table.data-table td');
	if ($(elem).hasClass('readonly')) return;
	$(elem).children().css('pointer-events', 'auto');
	$(elem).find('select, input').focus();
});

// 테이블 셀 내부 선택 해제 시 원래대로 복귀
$(document).on('blur', 'table.data-table th *, table.data-table td *', e => {
	let elem = $(e.target).closest('table.data-table th, table.data-table td');
	$(elem).children().css('pointer-events', '');
});

// 테이블 행 넘버링
const rowNumbering = () => {
	let table = $('table.data-table');
	let tbody = $(table).find('tbody');
	$(tbody).find('th.numbering').each((index, item) => {
		$(item).find('div').text(index + 1);
	});
};

/* table option
	header: 테이블명 & 'numbering', 'checkbox', 'radio' 시 예외적 생성
	name: input, select name 값
	width: colgroup col style width 값
	compType : null, 'editable', 'readonly', 'required'
	dataType : null, 'date', 'text', 'number', 'select', 'checkbox', 'radio', 'numbering'
	data : [데이터 값] or null => select인 경우 옵션으로...
		if select => [{value: 값, text: 지시글자, isSelect = 선택 여부(기본 false)}]
	styles : [{스타일 속성: 스타일 값}]
*/
var tableLayout = [
	{ header: 'numbering', name: null, width: '50px', compType: 'numbering', dataType: 'numbering', data: null, styles: [] },
	{ header: 'checkbox', name: null, width: '50px', compType: 'checkbox', dataType: 'checkbox', data: null, styles: [] },
	//{ header: '지시번호', name: 'workOrderCode', width: '80px', compType: 'readonly', dataType: 'text', data: null, styles: [] },
	{ header: '지시번호', name: 'workOrderCode', width: '80px', compType: 'readonly', dataType: null, data: null, styles: [] },
	//{ header: '상태', name: 'workOrderStatus', width: '50px', compType: 'readonly', dataType: 'text', data: null, styles: [] },
	{ header: '상태', name: 'workOrderStatus', width: '50px', compType: 'readonly', dataType: null, data: null, styles: [] },
	{ header: '유형', name: 'workType', width: '60px', compType: 'required', dataType: 'select', data: [{value:'', text:'--'}, {value:'일반', text:'일반'}, {value:'재작업', text:'재작업'}, {value:'개발품(시제품)', text:'개발품(시제품)'}], styles: [{'width':'60px'}] },
	{ header: '지시일', name: 'workOrderDate', width: '110px', compType: 'editable', dataType: 'date', data: null, styles: [] },
	{ header: '완료일', name: 'finishDate', width: '105px', compType: 'editable', dataType: 'date', data: null, styles: [] },
	{ header: 'ITEM코드', name: 'itemCode', width: '155px', compType: 'editable', dataType: 'text', data: null, styles: [] },
	//{ header: '품목유형', name: 'itemType', width: '121px', compType: 'readonly', dataType: 'text', data: null, styles: [] },
	{ header: '품목유형', name: 'itemType', width: '121px', compType: 'readonly', dataType: null, data: null, styles: [] },
	//{ header: '품명', name: 'itemName', width: '305px', compType: 'readonly', dataType: 'text', data: null, styles: [] },
	{ header: '품명', name: 'itemName', width: '305px', compType: 'readonly', dataType: null, data: null, styles: [] },
	{ header: '수량', name: 'itemQuantity', width: '50px', compType: 'required', dataType: 'number', data: null, styles: [] },
	{ header: '창고', name: 'whCode', width: '92px', compType: 'editable', dataType: 'text', data: null, styles: [] },
	//{ header: '창고명', name: 'whName', width: '91px', compType: 'readonly', dataType: 'text', data: null, styles: [] },
	{ header: '창고명', name: 'whName', width: '91px', compType: 'readonly', dataType: null, data: null, styles: [] },
	//{ header: '작업지시유형', name: 'workOrderType', width: '110px', compType: 'readonly', dataType: 'select', data: [{value:'', text:'--'}, {value:'자재수동투입', text:'자재수동투입'}, {value:'자재자동차감', text:'자재자동차감'}], styles: [{'width':'110px'}] }
	{ header: '작업지시유형', name: 'workOrderType', width: '110px', compType: 'readonly', dataType: null, data: [{value:'', text:'--'}, {value:'자재수동투입', text:'자재수동투입'}, {value:'자재자동차감', text:'자재자동차감'}], styles: [{'width':'110px'}] }
];

// data 구조에 맞게 템플릿화해서 보여주는 함수
const createTemplate = data => {
	let htmlString = '<tr>';
	for (let template of data) {
		htmlString += templateChild(template);
	}
	htmlString += '</tr>';
	return htmlString;
};
const templateChild = (datum) => {
	let name = datum.name;
	let className = !datum.compType ? '' : ' class="' + datum.compType + '"';
	const nameSetter = x => !x ? '' : ' name="' + x + '"';
	switch(datum.dataType) {
		case 'text': return '<td' + className + '><input' + nameSetter(name) + ' type="text"></td>';
		case 'number': return '<td' + className + '><input' + nameSetter(name) + ' type="number"></td>';
		case 'date': return '<td' + className + '><input' + nameSetter(name) + ' type="date"></td>';
		case 'select':
			let selectString = '<td' + className + '><select' + nameSetter(name);
			let styleString = '';
			for (let style of datum.styles) {
				let keyNames = Object.keys(style);
				for (let key of keyNames) {
					styleString += key + ':' + style[key] + ';';
				}
			}
			if (!(!datum.styles) && datum.styles.length > 0) selectString += 'style="' + styleString + '"';
			selectString += '>';
			if (!(!datum.data) && datum.data.length > 0) {
				for (let d of datum.data) {
					let optionString = '<option value="' + d.value + '">' + d.text + '</option>';
					selectString += optionString;
				}
			}
			selectString += '</select></td>';
			return selectString;
		case 'numbering': return '<th' + className + '><div></div></th>';
		case 'checkbox': return '<th' + className + '><div><input type="checkbox"></div></th>';
		case 'radio': return '<th' + className + '><div><input type="radio"></div></th>';
		case null: return '<td' + className + '></td>'
		default: return '';
	}
};

// 아이템 추가 버튼
$(document).on('click', 'button.add-item', e => {
	let table = $('table.data-table');
	let tbody = $(table).find('tbody');
	let elem = $(e.target).closest('button.add-item');
	let quantity = $(elem).closest('.wo-list-header-right').find('input.add-quantity').val();
	
	/*for (let i = 0; i < quantity; i++) {
		let $tr = $('<tr></tr>');
		$($tr).append('<th class="numbering"><div></div></th>');
		$($tr).append('<th><div><input type="checkbox"></div></th>');
		$($tr).append('<td class="readonly"></td>');
		$($tr).append('<td class="readonly"></td>');
		$($tr).append('<td class="required"><select name="workType" style="width: 60px;"><option value="">--</option><option value="일반">일반</option><option value="재작업">재작업</option><option value="개발품(시제품)">개발품(시제품)</option></td>');
		$($tr).append('<td class="editable"><input type="date" name="workOrderDate"></td>');
		$($tr).append('<td class="editable"><input type="date"></td>');
		$($tr).append('<td class="editable"><input type="text"></td>');
		$($tr).append('<td class="readonly"></td>');
		$($tr).append('<td class="readonly"></td>');
		$($tr).append('<td class="required"><input type="number" min="1"></td>');
		$($tr).append('<td class="editable"><input type="text"></td>');
		$($tr).append('<td class="readonly"></td>');
		$($tr).append('<td class="readonly"></td>');
		$(tbody).prepend($tr);
	}*/
	$(tbody).prepend(createTemplate(tableLayout));
	rowNumbering();
});

// 아이템 삭제 버튼
$(document).on('click', 'button.remove-item', e => {
	let table = $('table.data-table');
	let tbody = $(table).find('tbody');
	let elem = $(e.target).closest('button.remove-item');
	$(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').remove();
	rowNumbering();
});

// 설정 버튼
$(document).on('click', 'button.setting', e => {
	let elem = $(e.target).closest('button.setting');
	
});

// 데이터 ROW 선택
$(document).on('click', 'table.data-table tbody tr', e => {
	let elem = $(e.target).closest('table.data-table tbody tr');
	$(elem).closest('tbody').find('th input[type="checkbox"]').closest(':checked').not($(elem).find('input[type="checkbox"]')).prop('checked', false);
	$(elem).find('input[type="checkbox"]').prop('checked', true);
	let tbody = $(e.target).closest('tbody');
	let data = {
		type: $(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').find('select[name="workType"]').val(),
		date: $(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').find('input[name="workOrderDate"]').val()
	};
	$('.wo-header-value').find('select[name="workType"]').val(data.type)
				   .end().find('input[name="workOrderDate"]').val(data.date);
});

// 선택된 항목 모두 변경
$(document).on('change', '.wo-header-value select[name="workType"]', e => {
	let value = $(e.target).closest('.wo-header-value select[name="workType"]').val();
	let table = $('table.data-table');
	let tbody = $(table).find('tbody');
	$(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').find('select[name="workType"]').val(value);
});
$(document).on('change', '.wo-header-value input[name="workOrderDate"]', e => {
	let value = $(e.target).closest('.wo-header-value input[name="workOrderDate"]').val();
	let table = $('table.data-table');
	let tbody = $(table).find('tbody');
	$(tbody).find('th input[type="checkbox"]').closest(':checked').closest('tr').find('input[name="workOrderDate"]').val(value);
});