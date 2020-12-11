const Loading = () => {
  return (
    <div className="h-full flex flex-1 justify-center items-center w-full text-gray-500">
      <svg className="fill-current w-6 h-6 animate-spin" viewBox="0 0 20 20">
        <path d="M9.838 18.19c-.375 0-.754-.026-1.128-.08-3.59-.515-6.303-3.352-6.687-6.808l-.707.696A.797.797 0 01.232 12a.767.767 0 01-.004-1.094L2.44 8.769c.02-.011.052-.03.085-.042l.306-.061.11.014v-.004a.75.75 0 01.117.027l.136.058a.74.74 0 01.126.085l2.1 2.06a.754.754 0 01.23.545.754.754 0 01-.232.547.795.795 0 01-1.085 0l-.756-.744c.37 2.69 2.54 4.932 5.356 5.336a6.402 6.402 0 005.883-2.3.78.78 0 011.08-.124.767.767 0 01.126 1.084c-1.48 1.84-3.793 2.94-6.183 2.94M17.192 11.524l-.297-.052-.1-.05a.63.63 0 01-.114-.079l-2.1-2.059a.76.76 0 01.001-1.092.776.776 0 011.087.002l.754.742c-.368-2.689-2.54-4.932-5.355-5.336-2.23-.32-4.483.561-5.881 2.3a.781.781 0 01-1.081.125.759.759 0 01-.29-.515.762.762 0 01.163-.569c1.74-2.163 4.542-3.258 7.312-2.86 3.59.515 6.3 3.351 6.686 6.808l.707-.696a.778.778 0 011.086 0l.002.001a.758.758 0 01-.001 1.09l-2.161 2.108a1.028 1.028 0 01-.124.068l-.156.048a.848.848 0 01-.138.016" />
      </svg>
    </div>
  )
}

export default Loading
