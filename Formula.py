'''
自动解方程&化简代数式 基于sympy
@author YSChain
@version 0.4.0
@date 2020/03/08
'''

from sympy import simplify, solve

'''
自动解方程 | 化简代数式
@param comd 方程或代数式或指令
@return String格式的计算结果(已经做了“傻瓜化“和“美化“处理)
'''
def formulaSolve(comd):
    try:
        Result = ''
        equList = [] # 方程列表
        unkList = [] # 未知数列表
        
        # 找出所有未知数并放入unkList
        for it in range(0, len(comd)):
            if comd[it].isalpha() and comd[it] not in unkList:
                unkList.append(comd[it])
        unkList.sort()
        
        # 将生活中常见的表达方法(如:2x)转化为sympy可读的表达式(如:2*x)
        comd.replace(' ', '')
        comd.replace('^', '**')
        it = 0
        while it < len(comd) - 1:
            if (comd[it] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or comd[it] in unkList or comd[it] == ')') and (comd[it + 1] in unkList or comd[it + 1] == '('):
                comd = comd[0 : it + 1] + '*' + comd[it + 1 : len(comd)]                
            it += 1
        
        # 判断传来的是否为代数式,如果真,则进行计算和化简
        if (comd.find('=') == -1):
            Result += str(simplify(comd))
            it = 0
            while it < len(Result) - 2:
                if Result[it : it + 2] == '**':
                    Result = Result[0 : it] + '^' + Result[it + 2 : len(Result)]
                elif (Result[it] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or Result[it] in unkList) and Result[it + 1] == '*' and (Result[it + 2] in unkList or Result[it + 2] == '('):
                    Result = Result[0 : it + 1] + Result[it + 2 : len(Result)]
                it += 1
            Result += '\n'
        else:
            # 分解方程并改变格式
            comd += ','
            equStart = 0
            findResult = comd.find(',', equStart, len(comd))
            while findResult > -1 :
                equ = comd[equStart : findResult]
                equStart = findResult + 1
                equList.append(equ[0 : equ.find('=')] + '-(' + equ[equ.find('=') + 1 : len(equ)] + ')')
                findResult = comd.find(',', equStart, len(comd))
            
            # 计算
            R = solve(equList, unkList)
            # 将结果”傻瓜化”
            if type(R) == list:
                for i in R:
                    Result += '{ ' + unkList[0] + ' = ' + str(i[0])
                    if len(unkList) > 1:
                        for it in range(1, len(unkList)):
                            Result += ', ' + unkList[it] + ' = ' + str(i[it])
                    Result += ' }\n'
            else:
                unkLi = list(R.keys())
                Result += '{ ' + str(unkLi[0]) + ' = ' + str(R[unkLi[0]])
                if len(unkLi) > 1:
                    for it in range(1, len(unkLi)):
                        Result += ', ' + str(unkLi[it]) + ' = ' + str(R[unkLi[it]])
                Result += ' }\n'

        return Result
    except Exception as e:
        return '出现异常,请检查格式!\n'

print('\nWelcome To Use FormulaSolve_0.4.0!\n')
while True:
    print(formulaSolve(input('-->')))
