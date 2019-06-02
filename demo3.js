// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`

const main = () => {
  const canvas = document.getElementById('webgl')
  const gl = getWebGLContext(canvas)

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }
  
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders')
    return
  }


  const a_Position = gl.getAttribLocation(gl.program, 'a_Position') // 获取attribute 变量的存储位置保存在 js 中
  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize') 
  // const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }

  if(a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize')
    return
  }

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_Position, u_FragColor)
  }
  
  // 将顶点位置传递给 attribute 变量
  // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
  // gl.vertexAttrib1f(a_PointSize, 5.0)
  // // gl.uniform4f
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 清空绘图区之前, 要指定背景色
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = []
const g_colors = []

const click = (ev, gl, canvas, a_Position, a_PointSize, u_FragColor) => {
  let x = ev.clientX;
  let y = ev.clientY;
  const rect = ev.target.getBoundingClientRect()

  x = ((x - rect.left) - canvas.width/2) / (canvas.width/2)
  y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2)

  g_points.push([x, y])
  if (x >= 0.0 && y >= 0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0])
  } else if (x < 0.0 && y <= 0.0) {
    g_colors.push([0.0, 1.0, 0.0, 1.0])
  } else {
    g_colors.push([0.0, 0.0, 1.0, 1.0])
  }

  gl.clear(gl.COLOR_BUFFER_BIT) // 清空绘图区颜色, 指定的背景色开始生效
  const len = g_points.length
  
  for (let i = 0; i < len; i++) {
    const xy = g_points[i]
    const rgba = g_colors[i]
    console.log(rgba)
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0)
    gl.vertexAttrib1f(a_PointSize, 10.0)
    // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3])
    gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3])
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
main()

/**
 * 知识点
 * uniform 变量, 对所有顶点生效
 */

 /**
  * 遇到问题
  * a_PointSize 定义了但未传入 click 函数, 导致点没法渲染出来
  * 加了 a_PointSize 后, 出现的均为白点？
  */