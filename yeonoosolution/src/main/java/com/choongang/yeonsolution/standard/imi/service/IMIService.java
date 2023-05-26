package com.choongang.yeonsolution.standard.imi.service;

import java.util.List;

import com.choongang.yeonsolution.standard.imi.domain.ItemDto;

public interface IMIService {
	
	// 제품 리스트
	List<ItemDto> findItemList();

	// 제품 등록
	int addItem(ItemDto itemInfo);
	
	// 창고 목록
	List<ItemDto> findWhList();

}
