package com.choongang.yeonsolution.standard.pmi.service;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

import com.choongang.yeonsolution.standard.imi.domain.IMIItemDto;
import com.choongang.yeonsolution.standard.imi.service.IMIService;
import com.choongang.yeonsolution.standard.pmi.dao.PMIDao;
import com.choongang.yeonsolution.standard.pmi.domain.PMIBomDto;


@Service
@RequiredArgsConstructor
public class PMIServiceImpl implements PMIService {
	private final PMIDao pmiDao;
	private final IMIService imiService;
	
	@Override
	public List<IMIItemDto> findProductItemList() {
		List<IMIItemDto> findProductItemList = pmiDao.selectProductItemList();
		imiService.parseNullItems(findProductItemList);
		
		return findProductItemList;
	}

	@Override
	public List<IMIItemDto> findSemiProductItemList() {
		List<IMIItemDto> findSemiProductItemList = pmiDao.selectSemiProductItemList();
		imiService.parseNullItems(findSemiProductItemList);
		
		return findSemiProductItemList;
	}

	@Override
	public List<PMIBomDto> findBomListByItemCode(String itemCode) {

		return pmiDao.selectBomListByItemCode(itemCode);
	}

	@Override
	public int addBomByBomDto(PMIBomDto bomDto) {
		try {
	        int insertResult = pmiDao.insertBomByBomDto(bomDto);
	        return insertResult;
	    } catch (Exception e) {
	        // 중복 등록 시 예외 처리
	        return -1; // 중복으로 인해 인서트 실패
	    }
	}

	@Override
	public int removeBomByBomDto(PMIBomDto bomDto) {
		
		return pmiDao.deleteBomByBomDto(bomDto);
	}

}
