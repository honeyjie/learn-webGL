// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main() {
    gl_Position = u_xformMatrix * a_Position;
  }
`

const FSHADER_SOURCE = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`
const ANGLE = 90.0
// const Tx = 0.5, Ty = 0.5, Tz = 0.0
const Sx = 1.0, Sy = 1.5, Sz = 1.0

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

  // 设置点的位置
  const n = initVertexBuffers(gl)
  if (n < 0) {
    console.log('Failed to set the positions of the vertices')
  }

  const radian = Math.PI * ANGLE / 180.0
  const cosB = Math.cos(radian), sinB = Math.sin(radian)

  // 矩阵旋转
  // const xformMatrix = new Float32Array([
  //   cosB, sinB, 0.0, 0.0,
  //   -sinB, cosB, 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // ])

  // 矩阵缩放
  const xformMatrix = new Float32Array([
    Sx, 0.0, 0.0, 0.0,
    0.0, Sy, 0.0, 0.0,
    0.0, 0.0, Sz, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])

  const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix)

  // 平移
  // const u_Translation = gl.getUniformLocation(gl.program, 'u_Translation')
  // gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0)

  // 旋转
  const u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
  const u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
  gl.uniform1f(u_CosB, cosB)
  gl.uniform1f(u_SinB, sinB)

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
 * 
 */

 /**
  * 遇到问题
  */