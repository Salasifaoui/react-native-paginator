/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface PaginationProps {
  nbrPage: number;
  isRtl: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  bgColorSelect?: string;
  bgColor?: string;
  textColorSelect?: string;
  textColor?: string;
  showText?: boolean;
  fleshColor?: string;
  style?: any;
}

export default function PaginationButton({
  nbrPage,
  isRtl = false,
  currentPage,
  onPageChange,
  bgColorSelect = '#216F73',
  bgColor = 'white',
  textColorSelect = 'white',
  textColor = '#8B8D8D',
  showText = true,
  fleshColor = '#E64F00',
  style
}: PaginationProps) {
  // create an array that always start from number 1 to the number of pages
  const pages = [...Array(nbrPage)].map((_, i) => i + 1);

  const renderPrevButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (currentPage <= 1) return;
        onPageChange((prevPage) => prevPage - 1);
      }}>
      <View style={styles.paginationFlesh}>
        {isRtl ? (
          <Text style={[styles.textFlesh,{color: fleshColor}]}>{'>'}</Text>
        ) : (
          <Text style={[styles.textFlesh,{color: fleshColor}]}>{'<'}</Text>
        )}
        {showText && <Text style={[styles.textStyle,{color: fleshColor}]}>Prev</Text>}
      </View>
    </TouchableOpacity>
  );

  const renderNextButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (currentPage >= nbrPage) return;
        onPageChange((prevPage) => prevPage + 1);
      }}>
      <View style={styles.paginationFlesh}>
        {showText && <Text style={[styles.textStyle,{color: fleshColor}]}>Next</Text>}
        {isRtl ? (
          <Text style={[styles.textFlesh,{color: fleshColor}]}>{'<'}</Text>
        ) : (
          <Text style={[styles.textFlesh,{color: fleshColor}]}>{'>'}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
  const renderPageIndex = (pageIndex: number, onChange: (page: number) => void) => (
    <TouchableOpacity onPress={() => onChange(pageIndex)}>
        <View style={currentPage === pageIndex ? [styles.pageNumberSelectedStyle,{backgroundColor:bgColorSelect }] : [styles.pageNumberStyle,{backgroundColor: bgColor}]}>
        <Text style={currentPage === pageIndex ? [styles.textNumberSelectedStyle,{color: textColorSelect}] : [styles.textNumberStyle,{color: textColor}]}>{pageIndex}</Text>
      </View>
    </TouchableOpacity>
  );

  if (nbrPage <= 1) return null;
  if (nbrPage <= 5) {
    return (
      <View style={styles.container}>
        {renderPrevButton()}
        <View style={styles.listStyle}>
          {pages.map((page) =>
            page === currentPage ? (
              <View style={styles.pageStyle}>
                {renderPageIndex(page, onPageChange)}
              </View>
            ) : (
              renderPageIndex(page, onPageChange)
            )
          )}
        </View>
        {renderNextButton()}
      </View>
    );
  }

  return (
   
    <View style={[styles.container,{...style}]}>
      {renderPrevButton()}
      
      <View style={styles.listStyle}>
        {pages.map((page) =>
          page === 1 ? (
           
            <View style={styles.pageStyle}>
              {renderPageIndex(page, onPageChange)}
              {currentPage > 4 && page < 4 && <Text>...</Text>}
            </View>
          ) : page === nbrPage ? (
           
            <View style={styles.pageStyle}>
              {currentPage < nbrPage - 3 && <Text>...</Text>}

              {renderPageIndex(page, onPageChange)}
            </View>
          ) : (page <= 4 && currentPage <= 4) ||
            (page > nbrPage - 4 && currentPage > nbrPage - 4) ? (
            renderPageIndex(page, onPageChange)
          ) : page === currentPage - 1 || page === currentPage + 1 ? (
            renderPageIndex(page, onPageChange)
          ) : page === currentPage ? (
           
            <View style={styles.pageStyle}>
              {renderPageIndex(page, onPageChange)}
            </View>
          ) : null
        )}
      </View>
      {renderNextButton()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 2,
    marginBottom: 5,
  },
  listStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  textFlesh: {
    fontSize: 35,
    color: '#E64F00',
    paddingHorizontal: 5,
  },
  textStyle: {
    fontSize: 18,
    color: '#E64F00',
  },
  paginationFlesh: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageStyle: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  pageNumberStyle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  
  },
  pageNumberSelectedStyle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  textNumberStyle: {
    fontSize: 16,
    color: 'black',
  },
  textNumberSelectedStyle: {
    fontSize: 16,
    color: 'white',
  },

});
