MiniGallery
===========

jQuery plugin that helps to navigate through your images.

You can click on thumbnails, previous or next links(buttons) and press Ctrl + Left arrow (Rigth arrow).

**Instruction**

You should prepare small thumbnails and original big images.
Will be better if you place them to different folders.

**Convention.**

1. All images in each set have the same size.
2. All images have the same extension.
3. Thumbnails begin from a prefix.
4. Thumbnail image name = prefix + Big image name

**Using example**

In html code:
```
<div id="image-gallery"></div>
<div id="image-gallery-pager">
    <img src="img/small/small-image1.png" width="70" height="70">
    <img src="img/small/small-image2.png" width="70" height="70">
</div>
```
First `div` is a place where big images will be added.
The second contains thumbnails. They can be everywhere on a page.

Javascript init:
```
	$('#image-gallery').minigallery({
		path: 'img/big', /* Folder with big images, default: 'images' */
		prefix: 'small-', /* Small images prefix, default: 'small_' */
		extension: 'png', /* Big images extension, default: 'jpg' */
		image_width: 500, /* Big images width, default: 500 */
		image_height: 350, /* Big images height, default: 500 */
		btn_prev: '.prev', /* Previous button selector, default: '#prev' */
		btn_next: '.next', /* Next button selector, default: '#next' */
		active_image: 'active', /* Active image class name, assigned to current thumbnail image */
		loader: '#loader' /* Id or class of element with loader image */
	});
```
