import React from 'react'

import Image from './Image'

export default React.createClass({
	render() {
		let images = this.props.images.map((image, i) => {
			return <Image 
						key={i}
						imageUrl={`${window.location.origin}/images/${image}`} />
		})
		return images.length > 0 ? <div>{images}</div> : null
	}
})