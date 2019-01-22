import $ from "cash-dom"

import "./properties.styles.scss"
import { NodeTemplate } from "l3p-frontend"




export const html = new NodeTemplate(`
    <div id="sia-propview-container">

        <!-- canvas -->
        <div data-ref="canvas-area" id="sia-propview-canvas-container" class="sia-propview-canvas-border">
            <canvas data-ref="canvas"></canvas>
        </div>

        <!-- labelselect, description -->
        <div data-ref="label-area" id="sia-propview-label-and-descr-container">
            <select class="btn btn-default" id="sia-propview-label-select">
                <option value="wakaterimashta">wakaterimashta</option>
                <option value="wakata">wakata</option>
            </select>
            // <div id="sia-propview-label-select-mountpoint"></div>
            <textarea id="sia-propview-description" class="form-control" rows="3" placeholder="Description" disabled></textarea>
        </div>

        <!-- bounds and buttons -->
        <div data-ref="properties-area" id="sia-propview-bounds-and-buttons-container">
            <div data-ref="attr-1">
                <strong data-ref="attr-text-1"></strong>
                <span data-ref="attr-value-1"></span>
            </div>
            <div data-ref="attr-2">
                <strong data-ref="attr-text-2"></strong>
                <span data-ref="attr-value-2"></span>
            </div>
            <div data-ref="attr-3">
                <strong data-ref="attr-text-3"></strong>
                <span data-ref="attr-value-3"></span>
            </div>
            <div data-ref="attr-4">
                <strong data-ref="attr-text-4"></strong>
                <span data-ref="attr-value-4"></span>
            </div>
            <button data-ref="btn-first" class="btn btn-default"
                title="got to first edited image">
                <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
            </button>
            <button data-ref="btn-latest" class="btn btn-default"
                title="go to latest edited image">
                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
            </button>
            <button data-ref="btn-prev" class="btn btn-default">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <button data-ref="btn-next" class="btn btn-default">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    </div>
`)
export const image = new Image()

export function init(){
    resetCanvas()
    resetLabel()
    resetDescription()
    resetTable()
}

export function updateTable(drawable: DrawablePresenter){
    switch(drawable.getClassName()){
        case "PointPresenter":
            // show x and y
            html.refs["attr-text-1"].textContent = ""
            html.refs["attr-text-2"].textContent = ""
            html.refs["attr-text-3"].textContent = "X"
            html.refs["attr-text-4"].textContent = "Y"
            html.refs["attr-value-1"].textContent = ""
            html.refs["attr-value-2"].textContent = ""
            html.refs["attr-value-3"].textContent = Math.round(drawable.getX())
            html.refs["attr-value-4"].textContent = Math.round(drawable.getY())
            break
        case "BoxPresenter":
            // show x, y, w, h
            html.refs["attr-text-1"].textContent = "X"
            html.refs["attr-text-2"].textContent = "Y"
            html.refs["attr-text-3"].textContent = "W"
            html.refs["attr-text-4"].textContent = "H"
            html.refs["attr-value-1"].textContent = Math.round(drawable.getX())
            html.refs["attr-value-2"].textContent = Math.round(drawable.getY())
            html.refs["attr-value-3"].textContent = Math.round(drawable.getW())
            html.refs["attr-value-4"].textContent = Math.round(drawable.getH())
            break
        case "MultipointPresenter":
            // show left, right, top, bottom
            const { left, right, top, bottom } = drawable.getBounds()
            html.refs["attr-text-1"].textContent = "Left"
            html.refs["attr-text-2"].textContent = "Right"
            html.refs["attr-text-3"].textContent = "Top"
            html.refs["attr-text-4"].textContent = "Bottom"
            html.refs["attr-value-1"].textContent = Math.round(left)
            html.refs["attr-value-2"].textContent = Math.round(right)
            html.refs["attr-value-3"].textContent = Math.round(top)
            html.refs["attr-value-4"].textContent = Math.round(bottom)
            break
        default: 
            throw new Error(`Selected drawable has invalid class name: ${drawable.getClassName()}`)
    }    
}
export function updateCanvas(values: any){
    // reset canvas
    const ctx = html.refs["canvas"].getContext("2d")
    ctx.clearRect(0, 0, values.canvas.width, values.canvas.height)
    ctx.save()

    // draw clipped and centered image
    ctx.drawImage(
        image,
        values.drawable.source.x, values.drawable.source.y,
        values.canvas.width / values.canvas.zoomFactor, values.canvas.height / values.canvas.zoomFactor,
        0, 0,
        values.canvas.width, values.canvas.height
    )
    // draw paddings
    ctx.globalAlpha = 0.3
    ctx.fillStyle = "#000"
    if(values.drawable.ratio >= values.canvas.ratio) {
        // show height padding
        ctx.fillRect(0, 0, values.canvas.width, values.padding)
        ctx.fillRect(0, (values.drawable.height * values.drawable.zoomFactor) + values.padding, values.canvas.width, values.padding)
    } else {
        // show width padding
        ctx.fillRect(0, 0, values.padding, values.canvas.height)
        ctx.fillRect((values.drawable.width * values.drawable.zoomFactor) + values.padding, 0, values.padding, values.canvas.height)
    }

    ctx.restore()
}
export function updateLabels(labels: Array<any> = []){
    // remove all options from select
    html.ids["sia-propview-label-select"].innerHTML = ""

    // create one option node for every label in the models label list
    const options = new NodeTemplate(`
        ${
            labels.map(label => {
                return `
                    <option value="${label.id}">${label.name}</option>
                `
            })
        }
    `)
    html.ids["sia-propview-label-select"].appendChild(options.fragment)
}

export function setLayout(layout: String){
    switch(layout){
        case "landscape":
            $(html.root).toggleClass("propview-layout-portrait", false)
            $(html.root).toggleClass("propview-layout-landscape", true)
            break
        case "portrait":
            $(html.root).toggleClass("propview-layout-landscape", false)
            $(html.root).toggleClass("propview-layout-portrait", true)
            break
    }
}
export function setLabel(id: String){
    html.ids["sia-propview-label-select"].value = id
}
export function setDescription(description: String){
    html.ids["sia-propview-description"].textContent = description
}
export function setNextButtonState(state: String){
    switch(state){
        case "finish":
            enableNextButton()
            $(html.refs["btn-next"]).toggleClass("btn-default", false)
            $(html.refs["btn-next"]).toggleClass("btn-primary", true)
            html.refs["btn-next"].innerHTML = ""
            html.refs["btn-next"].innerText = "finish"
            break
        case "default":
            enableNextButton()
            $(html.refs["btn-next"]).toggleClass("btn-default", true)
            $(html.refs["btn-next"]).toggleClass("btn-primary", false)
            html.refs["btn-next"].innerText = ""
            html.refs["btn-next"].innerHTML = `<i class="fa fa-arrow-right" aria-hidden="true"></i>`
            break
        case "disable":
            disableNextButton()
            break
        case "enable":
            enableNextButton()
            break
        default:
            throw new Error(`unknown state '${state}'. use 'finish', 'disable', 'enable' or 'default' instead.`)
    }
}

export function resize(){
    html.refs["canvas"].width = $(html.refs["canvas"].parentNode).width()
    html.refs["canvas"].height = $(html.refs["canvas"].parentNode).height()
    // force width for hiearchy select. css not working as it should.
    $(html.refs["label-area"].firstChild).width($(html.refs["label-area"]).width())
}

export function resetCanvas(){
    const ctx = html.refs["canvas"].getContext("2d")
    ctx.clearRect(0, 0, html.refs["canvas"].width, html.refs["canvas"].height)
    showCanvasBorder()
}
export function resetTable(){
    html.refs["attr-text-1"].textContent = ""
    html.refs["attr-text-2"].textContent = ""
    html.refs["attr-text-3"].textContent = ""
    html.refs["attr-text-4"].textContent = ""
    html.refs["attr-value-1"].textContent = ""
    html.refs["attr-value-2"].textContent = ""
    html.refs["attr-value-3"].textContent = ""
    html.refs["attr-value-4"].textContent = ""
}
export function resetLabel(){
    // html.ids["sia-propview-label-select"].innerText = "No Drawable selected"
}
export function resetDescription(){
    html.ids["sia-propview-description"].innerHTML = "Select or create a Drawable to edit it."
    disableDescription()
}

export function enableLabeling(){
    html.ids["sia-propview-label-select"].disabled = false
}
export function enableDescription(){
    html.ids["sia-propview-description"].disabled = false
}
export function enableNavigationButtons(){
    enableFirstButton()    
    enableLastButton()    
    enableNextButton()    
    enablePrevButton()    
}
export function enableNextButton(){
    html.refs["btn-next"].disabled = false
}
export function enablePrevButton(){
    html.refs["btn-prev"].disabled = false
}
export function enableFirstButton(){
    html.refs["btn-first"].disabled = false
}
export function enableLastButton(){
    html.refs["btn-latest"].disabled = false
}

export function disableLabeling(){
    html.ids["sia-propview-label-select"].disabled = true
}
export function disableDescription(){
    html.ids["sia-propview-description"].disabled = true
}
export function disableNavigationButtons(){
    disableFirstButton()    
    disableLastButton()    
    disableNextButton()    
    disablePrevButton()    
}
export function disableNextButton(){
    html.refs["btn-next"].disabled = true
}
export function disablePrevButton(){
    html.refs["btn-prev"].disabled = true
}
export function disableFirstButton(){
    html.refs["btn-first"].disabled = true
}
export function disableLastButton(){
    html.refs["btn-latest"].disabled = true
}

export function showCanvasBorder(){
    $(html.ids["sia-propview-canvas-container"]).toggleClass("sia-propview-canvas-border", true)
}
export function hideCanvasBorder(){
    $(html.ids["sia-propview-canvas-container"]).toggleClass("sia-propview-canvas-border", false)
}

export function hide(){
    html.ids["sia-propview-container"].style.display = "none"
}
export function show(){
    html.ids["sia-propview-container"].style.display = "grid"
}

export function getBounds(){
    return html.root.getBoundingClientRect()
}
export function getWidth(){
    return html.root.clientWidth
}
export function getHeight(){
    return html.root.clientHeight
}

