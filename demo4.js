// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
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
  gl.drawArrays(gl.POINTS, 0, 3)
}

const initVertexBuffers = (gl) => {
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
  const n = 3
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
 * 绘制多个点
 * 缓冲区对象: 一次性地向着色器传入多个顶点的数据, 供顶点着色器使用
 * 步骤:
 *  1. 创建缓冲区对象 gl.createBuffer()
 *  2. 绑定缓冲区对象 gl.bindBuffer()
 *  3. 将数据写入缓冲区对象 gl.bufferData(target, data, usage)
 *     usage: gl.STATIC_DRAW 写入一次，绘制很多次  
 *            gl.STREAM_DRAW 写入一次, 绘制若干次 
 *            gl.DYNAMIC_DRAW, 写入多次并绘制很多次
 *     Float32Array 一种类型化数组
 *     具备 get(index) set(index, value) set(array, offset) length 等属性

 *  4. 将缓冲区对象分配给一个 attribute 变量 
 *     gl.vertexAttribPointer(location, size, type, normalized, stride, offset)
 *     location 存储位置
 *     size 缓冲区每个顶点的分量个数，缺失分量将自动补齐
 *     type: gl.FLOAT 浮点型
 *     normalize: 是否将非浮点型的数据归一到 [0, 1] [-1, 1]区间
 *     stride: 两个顶点间的字节数, 默认 0
 *     offset: 变量从缓冲区何处开始存储
 *     
 *  5. 开启 attribute 变量 gl.enableVertexAttribArray()
 */

 /**
  * 遇到问题
  * 
  */