// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`

const FSHADER_SOURCE = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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

  const n = initVertexBuffers(gl)
  if (n < 0) {
    console.log('Failed to set the positions of the vertices')
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 清空绘图区之前, 要指定背景色
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制多点
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
}

const initVertexBuffers = (gl) => {
  const vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5])
  const n = 4
  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer()
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer) // 绑定对象到缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW) // 写入数据

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

  // 给到位置变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

  gl.enableVertexAttribArray(a_Position) // 建立连接
 
  return n
}

main()

/**
 * 知识点
 * gl.POINTS 点
 * gl.LINES 线段
 * gl.LINE_STRIP 线条
 * gl.LINE_LOOP 回路
 * gl.TRANGLES 三角形
 * gl.TRIANGLE_STRIP 三角带
 */

 /**
  * 遇到问题
  */