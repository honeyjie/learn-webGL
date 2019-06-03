// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main() {
    gl_Position = u_ModelMatrix * a_Position;
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

  // 设置点的位置
  const n = initVertexBuffers(gl)
  if (n < 0) {
    console.log('Failed to set the positions of the vertices')
  }

  // const xformMatrix = new Matrix4()
  // xformMatrix.setRotate(ANGLE, 0, 0, 1)

  const ANGLE = 60.0
  const Tx = 0.1

  const modelMatrix = new Matrix4()
  modelMatrix.setRotate(ANGLE, 0, 0, 1) // 设置为旋转矩阵
  modelMatrix.translate(Tx, 0, 0) // 将模型矩阵乘以平移矩阵

  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

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
 * setTranslate(x, y, z) // 设置为平移变换矩阵
 * setRotate(x, y, z) // 旋转
 * setScale(x, y, z) // 缩放
 * translate(x, y, z) // 乘以平移变换矩阵
 * rotate(angle, x, y, x) // 乘以旋转
 * scale(x, y, z) // 乘以缩放
 * 
 * Matrix4.elements // 类型化数组, 包含矩阵元素
 */

 /**
  * 遇到问题
  */