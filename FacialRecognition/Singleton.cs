using MVVM_Library.Patterns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVVM.Library.Patterns
{
    public abstract class Singleton<T>
        where T : class
    {
        protected static T _instance;
        public static T Instance {
            get
            {
                if (_instance == null)
                    _instance = (T)Activator.CreateInstance(typeof(T), true);

                return _instance;
            }
            protected set
            {
                _instance = value;
            }
        }
    }
}