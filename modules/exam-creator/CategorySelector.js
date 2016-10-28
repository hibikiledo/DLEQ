import React, { Component } from 'react';
import update from 'react-addons-update';

import CategoryButton from './CategoryButton'

class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStates: Array.from({length: this.props.categories.length}, ()=>{return false})
    }    
    this.selectedCategoriesInOrder = []

    this._onCategoryButtonClick = this._onCategoryButtonClick.bind(this)
  }

  _onCategoryButtonClick(categoryId) {
    let updatedSelectedStates = update(
        this.state.selectedStates,
        {
          [categoryId]: { $set: ! this.state.selectedStates[categoryId]}
        }
    )
    this.setState({
      selectedStates: updatedSelectedStates
    })   
    
    // get array of selected category names
    let selectedCategories = this.props.categories
    .filter((category, i) => {
      return updatedSelectedStates[i]
    })
    .map((category, i) => {
      return category.name
    })

    let category = this.props.categories[categoryId]
    if (updatedSelectedStates[categoryId] === true) {
      this.selectedCategoriesInOrder.push(category.name)
    }
    else {
      let indexOfRemovingElement = this.selectedCategoriesInOrder.indexOf(category.name)
      this.selectedCategoriesInOrder.splice(indexOfRemovingElement, 1)
    }
    console.log(this.selectedCategoriesInOrder)
    this.props.onCategorySelected(this.selectedCategoriesInOrder)
  }
  render() {
    let categoryButtons = this.props.categories.map((category, i) => {
      return <CategoryButton
                key={i}
                categoryId={i}
                text={category.name}
                selected={this.state.selectedStates[i]}
                onCategoryButtonClick={this._onCategoryButtonClick} />
    })
    return (
      <div className="row category-selector">
        <div className="col-md-6 col-md-offset-3">
          <h2>เลือกหมวดหมู่ของคำถาม</h2>
          <p>คลิกที่ปุ่มของแต่ละหมวดหมู่ เพื่อเพิ่มคำถามจากหมวดหมู่นั้นเข้าสู่แบบทดสอบ</p>
          {categoryButtons}
        </div>
      </div>
    );
  }
}

export default CategorySelector
