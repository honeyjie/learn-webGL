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

const ANGLE_STEP = 45.0

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

  // 设置背景色
  gl.clearColor(0, 0, 0, 1)

  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
  if (!u_ModelMatrix) { 
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  let currentAngle = 0.0
  const modelMatrix = new Matrix4()

  // 绘制三角形
  const tick = () => {
    currentAngle = animate(currentAngle)
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
    requestAnimationFrame(tick, canvas)
  }

  tick()
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

const draw = (gl, n, currentAngle, modelMatrix, u_ModelMatrix) => {
  modelMatrix.setRotate(currentAngle, 0, 0, 1)
  // modelMatrix.translate(0.35, 0, 0);

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLES, 0, n)
}

let g_last = Date.now()
const animate = (angle) => {
  const now = Date.now()
  const elapsed = now - g_last
  g_last = now
  let newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0
  return newAngle %= 360
}

main()

/**
 * 知识点
 * 动画
 */

 /**
  * 遇到问题
  * drawArray 类型拼写错误, 不方便迅速定位问题
  */