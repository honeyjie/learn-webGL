const main = () => {
  const canvas = document.getElementById('webgl')
  const gl = getWebGLContext(canvas)

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }
  console.log(gl)
  gl.clearColor(0.0, 0.0, 1.0, 1.0) // 清空绘图区之前, 要指定背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空绘图区颜色, 指定的背景色开始生效
}

/**
 * 1.0, 0.0, 0.0, 1.0 红色
 * 0.0, 1.0, 0.0, 1.0 绿色
 * 0.0, 0.0, 1.0, 1.0 蓝色
 */

/**
 * 需要了解的知识点
 * 背景色直到下一次调用 gl.clearColor 才会改变
 * 清空绘图区域，实际上是清空颜色缓冲区(color buffer)
 * 缓冲区包含: COLOR_BUFFER_BIT(颜色)、DEPTH_BUFFER_BIT(深度)、STENCIL_BUFFER_BIT(模板)
 */

main()