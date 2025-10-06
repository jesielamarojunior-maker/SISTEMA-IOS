import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  UserCheck,
  UserX,
  Calendar,
  FileText,
  Upload,
  Download,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Key,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  UserPlus,
  Shield,
  BarChart3,
  Copy,
  RefreshCw,
  Info,
  Filter,
  Search,
  X,
  Bell,
  BellRing,
  AlertTriangle,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Configurar timeout global para axios
axios.defaults.timeout = 10000; // 10 segundos

// Authentication Context
const AuthContext = React.createContext();

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Timeout de segurança - nunca deixar loading indefinidamente
  useEffect(() => {
    const failsafeTimeout = setTimeout(() => {
      console.warn("⚠️ Timeout de segurança ativado - parando loading");
      setLoading(false);
    }, 15000); // 15 segundos

    return () => clearTimeout(failsafeTimeout);
  }, []);

  useEffect(() => {
    console.log("🚀 Inicializando autenticação...");
    console.log("🔗 Backend URL:", BACKEND_URL);

    if (!BACKEND_URL) {
      console.error("❌ BACKEND_URL não configurado!");
      setLoading(false);
      return;
    }

    if (token) {
      console.log("🔑 Token encontrado, verificando usuário...");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      console.log("ℹ️ Sem token, direcionando para login");
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      console.log("🔍 Verificando usuário atual...");
      const response = await axios.get(`${API}/auth/me`);
      console.log("✅ Usuário carregado:", response.data.email);
      setUser(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar usuário:", error);
      // Limpar dados inválidos e permitir novo login
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, senha) => {
    const response = await axios.post(`${API}/auth/login`, { email, senha });
    const { access_token, user: userData } = response.data;

    localStorage.setItem("token", access_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    setToken(access_token);
    setUser(userData);

    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login Component
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFirstAccess, setShowFirstAccess] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showBrandCard, setShowBrandCard] = useState(false);
  const [firstAccessData, setFirstAccessData] = useState({
    nome: "",
    email: "",
    tipo: "instrutor",
  });
  const { login } = useAuth();
  const { toast } = useToast();

  // Animação do card temporal da marca
  useEffect(() => {
    // Mostrar o card após 500ms
    const showTimer = setTimeout(() => {
      setShowBrandCard(true);
    }, 500);

    // Esconder o card após 4 segundos
    const hideTimer = setTimeout(() => {
      setShowBrandCard(false);
    }, 4500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login(email, senha);

      if (userData.primeiro_acesso) {
        toast({
          title: "Primeiro acesso detectado",
          description: "Você precisa alterar sua senha",
        });
        // Redirect to change password
      } else {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Sistema de Controle de Presença",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description:
          error.response?.data?.detail || "Verifique suas credenciais",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFirstAccessSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/auth/first-access`, firstAccessData);
      toast({
        title: "Solicitação enviada!",
        description:
          "Aguarde a aprovação do administrador para acessar o sistema.",
      });
      setShowFirstAccess(false);
      setFirstAccessData({ nome: "", email: "", tipo: "instrutor" });
    } catch (error) {
      toast({
        title: "Erro na solicitação",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      const response = await axios.post(`${API}/auth/reset-password-request`, {
        email: resetEmail,
      });

      // 🔐 SEGURANÇA: Não mostra mais a senha na tela
      toast({
        title: "Solicitação enviada!",
        description: response.data.message,
        variant: "default",
      });
      setShowResetPassword(false);
      setResetEmail("");
    } catch (error) {
      toast({
        title: "Erro ao resetar senha",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4 relative">
      {/* Logo principal do sistema */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <img 
          src="/logo-sistema.jpg" 
          alt="Logo do Sistema ClassCheck" 
          className="h-16 w-auto object-contain"
        />
      </div>

      <Card className="w-full max-w-md shadow-xl border-purple-200 mt-20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            ClassCheck
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sistema de Controle de Presença
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showFirstAccess && !showResetPassword ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ios.com.br"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white shadow-lg"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <div className="mt-4 pt-4 border-t border-purple-100 space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                  onClick={() => setShowFirstAccess(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Primeiro Acesso
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  onClick={() => setShowResetPassword(true)}
                >
                  Esqueci minha senha
                </Button>
              </div>
            </>
          ) : showResetPassword ? (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Resetar Senha</h3>
                <p className="text-sm text-gray-600">
                  Digite seu email para receber uma nova senha temporária
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
                  onClick={() => setShowResetPassword(false)}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white"
                  disabled={resetLoading}
                >
                  {resetLoading ? "Resetando..." : "Resetar Senha"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleFirstAccessSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">
                  Solicitar Primeiro Acesso
                </h3>
                <p className="text-sm text-gray-600">
                  Preencha os dados para solicitar acesso ao sistema
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={firstAccessData.nome}
                  onChange={(e) =>
                    setFirstAccessData({
                      ...firstAccessData,
                      nome: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={firstAccessData.email}
                  onChange={(e) =>
                    setFirstAccessData({
                      ...firstAccessData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <Select
                  value={firstAccessData.tipo}
                  onValueChange={(value) =>
                    setFirstAccessData({ ...firstAccessData, tipo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instrutor">Instrutor</SelectItem>
                    <SelectItem value="pedagogo">Pedagogo</SelectItem>
                    <SelectItem value="monitor">Monitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
                  onClick={() => setShowFirstAccess(false)}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white"
                >
                  Solicitar Acesso
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Card temporário da marca */}
      <div className={`fixed bottom-5 left-5 flex items-center bg-black bg-opacity-75 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-800 z-50 ${
        showBrandCard 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-3 pointer-events-none'
      }`}>
        <img 
          src="/logo-amaros.svg" 
          alt="Amaro's Developer Logo" 
          className="h-7 mr-3"
        />
        <span className="text-sm font-normal tracking-wide">
          by Amaro's Developer – Sistema de Controle de Presença
        </span>
      </div>
    </div>
  );
};

// 🔔 Componente de Notificações
const NotificationButton = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Buscar notificações ao montar o componente
  useEffect(() => {
    fetchNotifications();

    // Verificar notificações a cada 5 minutos
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API}/notifications/pending-calls`);
      setNotifications(response.data.chamadas_pendentes || []);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationCount = () => {
    return notifications.length;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "text-red-600";
      case "media":
        return "text-orange-600";
      default:
        return "text-yellow-600";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "media":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDialog(true)}
        className="relative text-gray-500 hover:text-gray-700"
        title="Notificações de chamadas pendentes"
      >
        {getNotificationCount() > 0 ? (
          <BellRing className="h-5 w-5" />
        ) : (
          <Bell className="h-5 w-5" />
        )}
        {getNotificationCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getNotificationCount()}
          </span>
        )}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Chamadas Pendentes
            </DialogTitle>
            <DialogDescription>
              {getNotificationCount() === 0
                ? "Todas as chamadas estão em dia!"
                : `${getNotificationCount()} turma(s) sem chamada registrada`}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600">Carregando...</span>
              </div>
            ) : getNotificationCount() === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Todas as chamadas estão em dia!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Não há turmas com chamadas pendentes.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <Card key={index} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {notification.turma_nome}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getPriorityBadge(
                                notification.prioridade
                              )}
                            >
                              {notification.prioridade === "alta"
                                ? "Urgente"
                                : notification.prioridade === "media"
                                ? "Importante"
                                : "Pendente"}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-gray-600">
                            <p>
                              <strong>Instrutor:</strong>{" "}
                              {notification.instrutor_nome}
                            </p>
                            <p>
                              <strong>Unidade:</strong>{" "}
                              {notification.unidade_nome}
                            </p>
                            <p>
                              <strong>Curso:</strong> {notification.curso_nome}
                            </p>
                            <p
                              className={`font-medium ${getPriorityColor(
                                notification.prioridade
                              )}`}
                            >
                              <strong>Última chamada:</strong>{" "}
                              {formatDate(notification.data_faltante)}
                            </p>
                          </div>
                        </div>

                        <AlertTriangle
                          className={`h-5 w-5 ${getPriorityColor(
                            notification.prioridade
                          )}`}
                        />
                      </div>

                      <p className="text-xs text-gray-500 mt-3 italic">
                        {notification.motivo}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={fetchNotifications}
              disabled={loading}
              size="sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>

            <Button onClick={() => setShowDialog(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ClassCheck</h1>
                <p className="text-xs text-gray-500">by Amaro's Developer</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Componente de Notificações */}
              <NotificationButton />

              <Badge variant="outline">
                {user?.tipo === "admin"
                  ? "Administrador"
                  : user?.tipo === "instrutor"
                  ? "Instrutor"
                  : user?.tipo === "pedagogo"
                  ? "Pedagogo"
                  : "Monitor"}
              </Badge>
              <span className="text-sm text-gray-700">{user?.nome}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
                title="Sair do sistema"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 📊 Dashboard Personalizado por Usuário */}
        {user?.tipo !== "admin" && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {stats.tipo_usuario ||
                    user?.tipo?.charAt(0).toUpperCase() + user?.tipo?.slice(1)}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    <Building2 className="h-4 w-4 inline mr-1" />
                    {stats.unidade_nome || "Sua unidade"}
                  </span>
                  <span>
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    {stats.curso_nome || "Seu curso"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user?.tipo === "admin" ? "Unidades" : "Sua Unidade"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total_unidades || 0}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user?.tipo === "admin" ? "Cursos" : "Seu Curso"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total_cursos || 0}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user?.tipo === "admin"
                      ? "Turmas"
                      : user?.tipo === "instrutor"
                      ? "Minhas Turmas"
                      : "Turmas do Curso"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total_turmas || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user?.tipo === "admin"
                      ? "Alunos"
                      : user?.tipo === "instrutor"
                      ? "Meus Alunos"
                      : "Alunos do Curso"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total_alunos || 0}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Alunos Ativos</p>
                  <p className="text-lg font-semibold">
                    {stats.alunos_ativos || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserX className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Desistentes</p>
                  <p className="text-lg font-semibold">
                    {stats.alunos_desistentes || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Taxa Presença</p>
                  <p className="text-lg font-semibold">
                    {stats.taxa_presenca_mes || 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Chamadas Hoje</p>
                  <p className="text-lg font-semibold">
                    {stats.chamadas_hoje || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="turmas" className="w-full">
          <TabsList className="flex flex-wrap w-full justify-center gap-1 h-auto p-1">
            <TabsTrigger
              value="turmas"
              className="flex-1 min-w-0 text-sm whitespace-nowrap"
            >
              Turmas
            </TabsTrigger>
            <TabsTrigger
              value="chamada"
              className="flex-1 min-w-0 text-sm whitespace-nowrap"
            >
              Chamada
            </TabsTrigger>

            {/* 🎯 ALUNOS: Disponível para instrutores, pedagogos, monitores e admin */}
            {["admin", "instrutor", "pedagogo", "monitor"].includes(
              user?.tipo
            ) && (
              <TabsTrigger
                value="alunos"
                className="flex-1 min-w-0 text-sm whitespace-nowrap"
              >
                Alunos
              </TabsTrigger>
            )}

            {user?.tipo === "admin" && (
              <>
                <TabsTrigger
                  value="unidades"
                  className="flex-1 min-w-0 text-sm whitespace-nowrap"
                >
                  Unidades
                </TabsTrigger>
                <TabsTrigger
                  value="cursos"
                  className="flex-1 min-w-0 text-sm whitespace-nowrap"
                >
                  Cursos
                </TabsTrigger>
                <TabsTrigger
                  value="usuarios"
                  className="flex-1 min-w-0 text-sm whitespace-nowrap"
                >
                  Usuários
                </TabsTrigger>
              </>
            )}
            <TabsTrigger
              value="relatorios"
              className="flex-1 min-w-0 text-sm whitespace-nowrap"
            >
              Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="turmas">
            <TurmasManager />
          </TabsContent>

          <TabsContent value="chamada">
            <ChamadaManager />
          </TabsContent>

          {/* 🎯 ALUNOS: Instrutores/Pedagogos/Monitores podem cadastrar alunos em suas turmas */}
          {["admin", "instrutor", "pedagogo", "monitor"].includes(
            user?.tipo
          ) && (
            <TabsContent value="alunos">
              <AlunosManager />
            </TabsContent>
          )}

          {user?.tipo === "admin" && (
            <>
              <TabsContent value="unidades">
                <UnidadesManager />
              </TabsContent>

              <TabsContent value="cursos">
                <CursosManager />
              </TabsContent>

              <TabsContent value="usuarios">
                <UsuariosManager />
              </TabsContent>
            </>
          )}

          <TabsContent value="relatorios">
            <RelatoriosManager />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer discreto */}
      <footer className="mt-auto py-4 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs text-gray-400">
            Desenvolvido por{" "}
            <span className="font-medium text-gray-600">Amaro's Developer</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sistema de Chamada Component CORRIGIDO
const ChamadaManager = () => {
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [presencas, setPresencas] = useState({});
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAlunos, setLoadingAlunos] = useState(false);
  const [isAtestadoChamadaDialogOpen, setIsAtestadoChamadaDialogOpen] =
    useState(false);
  const [selectedAlunoAtestado, setSelectedAlunoAtestado] = useState(null);
  const [selectedFileAtestado, setSelectedFileAtestado] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/classes`);
      setTurmas(response.data);
    } catch (error) {
      console.error("Error fetching turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlunos = async (turmaId) => {
    try {
      setLoadingAlunos(true);
      console.log("Fetching alunos for turma:", turmaId);
      const response = await axios.get(`${API}/classes/${turmaId}/students`);
      console.log("Alunos response:", response.data);
      setAlunos(response.data);

      // Initialize presencas with all students present by default
      const initialPresencas = {};
      response.data.forEach((aluno) => {
        initialPresencas[aluno.id] = {
          presente: true,
          justificativa: "",
          atestado_id: "",
        };
      });
      setPresencas(initialPresencas);
    } catch (error) {
      console.error("Error fetching alunos:", error);
      toast({
        title: "Erro ao carregar alunos",
        description: "Não foi possível carregar a lista de alunos da turma",
        variant: "destructive",
      });
    } finally {
      setLoadingAlunos(false);
    }
  };

  const handleTurmaChange = (turmaId) => {
    console.log("Turma selected:", turmaId);
    setSelectedTurma(turmaId);
    setAlunos([]);
    setPresencas({});
    if (turmaId) {
      fetchAlunos(turmaId);
    }
  };

  const handlePresencaChange = (alunoId, presente) => {
    setPresencas((prev) => ({
      ...prev,
      [alunoId]: {
        ...prev[alunoId],
        presente,
      },
    }));
  };

  const handleJustificativaChange = (alunoId, justificativa) => {
    setPresencas((prev) => ({
      ...prev,
      [alunoId]: {
        ...prev[alunoId],
        justificativa,
      },
    }));
  };

  const handleUploadAtestadoChamada = (aluno) => {
    setSelectedAlunoAtestado(aluno);
    setSelectedFileAtestado(null);
    setIsAtestadoChamadaDialogOpen(true);
  };

  const submitAtestadoChamada = async () => {
    if (!selectedFileAtestado) {
      toast({
        title: "Arquivo obrigatório",
        description: "Por favor, selecione um arquivo de atestado.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFileAtestado);
      formData.append("aluno_id", selectedAlunoAtestado.id);
      formData.append("tipo", "atestado_medico");

      const response = await axios.post(`${API}/upload/atestado`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualizar a presença com o ID do atestado
      setPresencas((prev) => ({
        ...prev,
        [selectedAlunoAtestado.id]: {
          ...prev[selectedAlunoAtestado.id],
          atestado_id: response.data.id,
          justificativa: "Falta justificada com atestado médico",
        },
      }));

      toast({
        title: "Atestado enviado",
        description: `Atestado médico de ${selectedAlunoAtestado.nome} foi registrado na chamada.`,
      });

      setIsAtestadoChamadaDialogOpen(false);
      setSelectedAlunoAtestado(null);
      setSelectedFileAtestado(null);
    } catch (error) {
      console.error("Error uploading atestado:", error);
      toast({
        title: "Erro ao enviar atestado",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleSalvarChamada = async () => {
    if (!selectedTurma) {
      toast({
        title: "Erro",
        description: "Selecione uma turma primeiro",
        variant: "destructive",
      });
      return;
    }

    // 🔒 VALIDAÇÃO: Só permite chamada do dia atual
    const hoje = new Date().toISOString().split("T")[0];
    const agora = new Date().toTimeString().split(" ")[0].substring(0, 5);

    // Verificar se é realmente hoje
    const dataAtual = new Date();
    const dataHoje = dataAtual.toISOString().split("T")[0];

    if (hoje !== dataHoje) {
      toast({
        title: "Data inválida",
        description: "Só é possível fazer chamada da data atual",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post(`${API}/attendance`, {
        turma_id: selectedTurma,
        data: hoje,
        horario: agora,
        observacoes_aula: observacoes,
        presencas: presencas,
      });

      toast({
        title: "Chamada salva com sucesso!",
        description: `Os dados de presença foram registrados para ${new Date().toLocaleDateString(
          "pt-BR"
        )}`,
      });

      // 🎯 IMPORTANTE: Após salvar, remover a turma da lista (não pode fazer chamada novamente hoje)
      setTurmas((prev) => prev.filter((t) => t.id !== selectedTurma));
      setSelectedTurma("");
      setAlunos([]);
      setPresencas({});
      setObservacoes("");
    } catch (error) {
      toast({
        title: "Erro ao salvar chamada",
        description:
          error.response?.data?.detail ||
          "Já foi feita chamada hoje para esta turma",
        variant: "destructive",
      });
    }
  };

  const totalPresentes = Object.values(presencas).filter(
    (p) => p.presente
  ).length;
  const totalFaltas = Object.values(presencas).filter(
    (p) => !p.presente
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
          Sistema de Chamada
        </CardTitle>
        <CardDescription>
          Registre a presença dos alunos de forma rápida e eficiente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Selecionar Turma</Label>
          <Select value={selectedTurma} onValueChange={handleTurmaChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              {turmas.map((turma) => (
                <SelectItem key={turma.id} value={turma.id}>
                  {turma.nome} - {turma.ciclo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTurma && (
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total de Alunos</p>
                    <p className="text-lg font-semibold">{alunos.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Presentes</p>
                    <p className="text-lg font-semibold text-green-600">
                      {totalPresentes}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Faltas</p>
                    <p className="text-lg font-semibold text-red-600">
                      {totalFaltas}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {loadingAlunos && (
          <div className="text-center py-8">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Carregando lista de alunos...</p>
          </div>
        )}

        {alunos.length > 0 && !loadingAlunos && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Lista de Presença - {new Date().toLocaleDateString()}
              </h3>

              <div className="space-y-3">
                {alunos.map((aluno, index) => (
                  <Card
                    key={aluno.id}
                    className={`p-4 transition-all ${
                      presencas[aluno.id]?.presente
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm text-gray-500 w-8">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={presencas[aluno.id]?.presente || false}
                            onCheckedChange={(checked) =>
                              handlePresencaChange(aluno.id, checked)
                            }
                            className="w-5 h-5"
                          />
                          <label className="text-sm font-medium cursor-pointer">
                            {presencas[aluno.id]?.presente
                              ? "Presente"
                              : "Falta"}
                          </label>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="font-medium">{aluno.nome}</p>
                        <p className="text-sm text-gray-500">
                          CPF: {aluno.cpf}
                        </p>
                      </div>

                      {!presencas[aluno.id]?.presente && (
                        <div className="flex-1 space-y-2">
                          <Label className="text-sm">
                            Justificativa da Falta
                          </Label>
                          <Textarea
                            placeholder="Digite o motivo da falta..."
                            value={presencas[aluno.id]?.justificativa || ""}
                            onChange={(e) =>
                              handleJustificativaChange(
                                aluno.id,
                                e.target.value
                              )
                            }
                            className="min-h-16"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleUploadAtestadoChamada(aluno)}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Atestado
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações da Aula</Label>
              <Textarea
                id="observacoes"
                placeholder="Digite observações sobre a aula, conteúdo ministrado, ocorrências..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSalvarChamada}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
            >
              <Save className="h-5 w-5 mr-2" />
              Salvar Chamada - {totalPresentes} Presentes, {totalFaltas} Faltas
            </Button>
          </>
        )}

        {selectedTurma && alunos.length === 0 && !loadingAlunos && (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum aluno encontrado nesta turma</p>
          </div>
        )}
      </CardContent>

      {/* Dialog para upload de atestado na chamada */}
      <Dialog
        open={isAtestadoChamadaDialogOpen}
        onOpenChange={setIsAtestadoChamadaDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Atestado Médico</DialogTitle>
            <DialogDescription>
              Anexar atestado médico para {selectedAlunoAtestado?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Arquivo do atestado *</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setSelectedFileAtestado(e.target.files[0])}
              />
              <p className="text-sm text-gray-500 mt-1">
                Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAtestadoChamadaDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={submitAtestadoChamada}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Anexar Atestado
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Usuarios Manager Component CORRIGIDO
const UsuariosManager = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tipo: "",
    telefone: "",
    unidade_id: "",
    curso_id: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usuariosRes, unidadesRes, cursosRes] = await Promise.all([
        axios.get(`${API}/users`),
        axios.get(`${API}/units`),
        axios.get(`${API}/courses`),
      ]);

      setUsuarios(usuariosRes.data);
      setUnidades(unidadesRes.data);
      setCursos(cursosRes.data);

      // Fetch pending users
      try {
        const pendingRes = await axios.get(`${API}/users/pending`);
        setPendingUsers(pendingRes.data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`${API}/users/${editingUser.id}`, formData);
        toast({
          title: "Usuário atualizado com sucesso!",
          description: "As informações do usuário foram atualizadas.",
        });
      } else {
        // When creating user, a temporary password will be generated
        await axios.post(`${API}/users`, formData);
        toast({
          title: "Usuário criado com sucesso!",
          description:
            "Uma senha temporária foi gerada. O usuário deve fazer login e alterá-la.",
        });
      }

      setIsDialogOpen(false);
      setEditingUser(null);
      resetForm();
      fetchData();
    } catch (error) {
      toast({
        title: editingUser
          ? "Erro ao atualizar usuário"
          : "Erro ao criar usuário",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  // 🔐 NOVA FUNÇÃO: Reset de senha administrativo
  const handleResetPassword = async (userId, userName) => {
    try {
      const response = await axios.post(
        `${API}/users/${userId}/reset-password`
      );

      toast({
        title: "Senha resetada com sucesso!",
        description: `Nova senha temporária para ${response.data.user_name}: ${response.data.temp_password}`,
        variant: "default",
      });

      // Mostra alert adicional para garantir que admin veja a senha
      alert(
        `🔐 SENHA TEMPORÁRIA para ${response.data.user_name}:\n\n${response.data.temp_password}\n\nInforme esta senha ao usuário. Ele deverá alterá-la no primeiro acesso.`
      );
    } catch (error) {
      toast({
        title: "Erro ao resetar senha",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.put(`${API}/users/${userId}/approve`);
      toast({
        title: "Usuário aprovado!",
        description: "O usuário pode agora acessar o sistema.",
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Erro ao aprovar usuário",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      tipo: "",
      telefone: "",
      unidade_id: "",
      curso_id: "",
    });
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      telefone: usuario.telefone || "",
      unidade_id: usuario.unidade_id || "",
      curso_id: usuario.curso_id || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Tem certeza que deseja desativar este usuário?")) {
      try {
        await axios.delete(`${API}/users/${userId}`);
        toast({
          title: "Usuário desativado com sucesso!",
          description: "O usuário foi desativado do sistema.",
        });
        fetchData();
      } catch (error) {
        toast({
          title: "Erro ao desativar usuário",
          description: error.response?.data?.detail || "Tente novamente",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpenDialog = () => {
    setEditingUser(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const getTipoLabel = (tipo) => {
    const tipos = {
      admin: "Administrador",
      instrutor: "Instrutor",
      pedagogo: "Pedagogo",
      monitor: "Monitor",
    };
    return tipos[tipo] || tipo;
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="space-y-6">
      {/* Pending Users Section */}
      {pendingUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-orange-500" />
              Usuários Pendentes de Aprovação
            </CardTitle>
            <CardDescription>
              Usuários que solicitaram primeiro acesso e aguardam aprovação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.nome}</p>
                    <p className="text-sm text-gray-500">
                      {user.email} - {getTipoLabel(user.tipo)}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleApproveUser(user.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>
                Gerencie usuários do sistema (Admin Master, Instrutor, Pedagogo,
                Monitor)
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleOpenDialog}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingUser ? "Editar Usuário" : "Criar Novo Usuário"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingUser
                      ? "Atualize os dados do usuário"
                      : "Preencha os dados para criar um novo usuário. Uma senha temporária será gerada."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Usuário</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) =>
                        setFormData({ ...formData, tipo: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="instrutor">Instrutor</SelectItem>
                        <SelectItem value="pedagogo">Pedagogo</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  {formData.tipo !== "admin" && (
                    <>
                      <div className="space-y-2">
                        <Label>Unidade</Label>
                        <Select
                          value={formData.unidade_id}
                          onValueChange={(value) =>
                            setFormData({ ...formData, unidade_id: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a unidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {unidades.map((unidade) => (
                              <SelectItem key={unidade.id} value={unidade.id}>
                                {unidade.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {["instrutor", "pedagogo", "monitor"].includes(
                        formData.tipo
                      ) && (
                        <div className="space-y-2">
                          <Label>Curso *</Label>
                          <Select
                            value={formData.curso_id}
                            onValueChange={(value) =>
                              setFormData({ ...formData, curso_id: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                            <SelectContent>
                              {cursos.map((curso) => (
                                <SelectItem key={curso.id} value={curso.id}>
                                  {curso.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingUser ? "Atualizar Usuário" : "Criar Usuário"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                      {usuario.nome}
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTipoLabel(usuario.tipo)}
                      </Badge>
                    </TableCell>
                    <TableCell>{usuario.telefone || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={usuario.ativo ? "default" : "secondary"}>
                        {usuario.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(usuario)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleResetPassword(usuario.id, usuario.nome)
                          }
                          className="text-blue-600 hover:text-blue-700"
                          title="Resetar Senha"
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(usuario.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Turmas Manager Component CORRIGIDO
const TurmasManager = () => {
  const { user } = useAuth(); // ✅ CORREÇÃO: Adicionar useAuth para acessar user
  const [turmas, setTurmas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlunoDialogOpen, setIsAlunoDialogOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState(null);
  const [selectedTurmaForAlunos, setSelectedTurmaForAlunos] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    unidade_id: "",
    curso_id: "",
    instrutor_id: "",
    data_inicio: "",
    data_fim: "",
    horario_inicio: "",
    horario_fim: "",
    dias_semana: [],
    vagas_total: 30,
    ciclo: "01/2025",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching turmas data...");
      const [turmasRes, unidadesRes, cursosRes, usuariosRes, alunosRes] =
        await Promise.all([
          axios.get(`${API}/classes`),
          axios.get(`${API}/units`),
          axios.get(`${API}/courses`),
          axios.get(`${API}/users?tipo=instrutor`),
          axios.get(`${API}/students`),
        ]);

      console.log("Turmas:", turmasRes.data);
      console.log("Unidades:", unidadesRes.data);
      console.log("Cursos:", cursosRes.data);
      console.log("Usuarios:", usuariosRes.data);
      console.log("Alunos:", alunosRes.data);

      setTurmas(turmasRes.data);
      setUnidades(unidadesRes.data);
      setCursos(cursosRes.data);
      setUsuarios(usuariosRes.data);
      setAlunos(alunosRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados necessários",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTurma) {
        await axios.put(`${API}/classes/${editingTurma.id}`, formData);
        toast({
          title: "Turma atualizada com sucesso!",
          description: "As informações da turma foram atualizadas.",
        });
      } else {
        await axios.post(`${API}/classes`, formData);
        toast({
          title: "Turma criada com sucesso!",
          description: "A nova turma foi adicionada ao sistema.",
        });
      }

      setIsDialogOpen(false);
      setEditingTurma(null);
      resetForm();
      fetchData();
    } catch (error) {
      toast({
        title: editingTurma ? "Erro ao atualizar turma" : "Erro ao criar turma",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    // ✅ AUTO-PREENCHIMENTO: Para não-admin, pré-preencher unidade e instrutor
    const defaultUnidadeId =
      user?.tipo !== "admin" ? user?.unidade_id || "" : "";
    const defaultInstrutorId = user?.tipo !== "admin" ? user?.id || "" : "";
    const defaultCursoId = user?.tipo !== "admin" ? user?.curso_id || "" : "";

    setFormData({
      nome: "",
      unidade_id: defaultUnidadeId,
      curso_id: defaultCursoId,
      instrutor_id: defaultInstrutorId,
      data_inicio: "",
      data_fim: "",
      horario_inicio: "",
      horario_fim: "",
      dias_semana: [],
      vagas_total: 30,
      ciclo: "01/2025",
    });
  };

  const handleViewTurma = (turma) => {
    const unidadeNome =
      unidades.find((u) => u.id === turma.unidade_id)?.nome || "N/A";
    const cursoNome =
      cursos.find((c) => c.id === turma.curso_id)?.nome || "N/A";
    const instrutorNome =
      usuarios.find((u) => u.id === turma.instrutor_id)?.nome || "N/A";

    alert(
      `📋 DETALHES DA TURMA\n\n` +
        `Nome: ${turma.nome}\n` +
        `Unidade: ${unidadeNome}\n` +
        `Curso: ${cursoNome}\n` +
        `Instrutor: ${instrutorNome}\n` +
        `Período: ${turma.data_inicio} a ${turma.data_fim}\n` +
        `Horário: ${turma.horario_inicio} às ${turma.horario_fim}\n` +
        `Vagas: ${turma.vagas_ocupadas || 0}/${turma.vagas_total}\n` +
        `Ciclo: ${turma.ciclo}\n` +
        `Status: ${turma.ativo ? "Ativa" : "Inativa"}`
    );
  };

  const handleEdit = (turma) => {
    setEditingTurma(turma);
    setFormData({
      nome: turma.nome,
      unidade_id: turma.unidade_id,
      curso_id: turma.curso_id,
      instrutor_id: turma.instrutor_id,
      data_inicio: turma.data_inicio,
      data_fim: turma.data_fim,
      horario_inicio: turma.horario_inicio,
      horario_fim: turma.horario_fim,
      dias_semana: turma.dias_semana || [],
      vagas_total: turma.vagas_total,
      ciclo: turma.ciclo,
    });
    setIsDialogOpen(true);
  };

  const handleOpenDialog = () => {
    setEditingTurma(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleManageAlunos = (turma) => {
    setSelectedTurmaForAlunos(turma);
    setIsAlunoDialogOpen(true);
  };

  const handleDeleteTurma = async (turma) => {
    // 🔒 VERIFICAÇÃO: Apenas admin pode deletar
    if (user?.tipo !== "admin") {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem deletar turmas",
        variant: "destructive",
      });
      return;
    }

    // ⚠️ CONFIRMAÇÃO: Pedir confirmação antes de deletar
    const confirmar = window.confirm(
      `⚠️ ATENÇÃO: Tem certeza que deseja DELETAR a turma "${turma.nome}"?\n\n` +
        `Esta ação é IRREVERSÍVEL e:\n` +
        `• Removerá permanentemente a turma do sistema\n` +
        `• Não afetará os alunos (eles continuarão cadastrados)\n` +
        `• Não poderá ser desfeita\n\n` +
        `Digite "SIM" para confirmar:`
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await axios.delete(`${API}/classes/${turma.id}`);

      toast({
        title: "Turma deletada com sucesso!",
        description: `A turma "${turma.nome}" foi removida permanentemente`,
        className: "bg-green-50 border-green-200",
      });

      // Atualizar lista de turmas
      fetchData();

      console.log("🗑️ Turma deletada:", response.data);
    } catch (error) {
      console.error("❌ Erro ao deletar turma:", error);

      // Tratar erros específicos do backend
      if (error.response?.status === 400) {
        toast({
          title: "Não é possível deletar",
          description:
            error.response.data.detail || "Turma possui dependências",
          variant: "destructive",
        });
      } else if (error.response?.status === 403) {
        toast({
          title: "Acesso negado",
          description: "Apenas administradores podem deletar turmas",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao deletar turma",
          description: "Ocorreu um erro interno. Tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddAlunoToTurma = async (alunoId) => {
    try {
      await axios.put(
        `${API}/classes/${selectedTurmaForAlunos.id}/students/${alunoId}`
      );
      toast({
        title: "Aluno adicionado com sucesso!",
        description: "O aluno foi adicionado à turma.",
      });
      fetchData(); // Atualizar dados
    } catch (error) {
      toast({
        title: "Erro ao adicionar aluno",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAlunoFromTurma = async (alunoId) => {
    try {
      await axios.delete(
        `${API}/classes/${selectedTurmaForAlunos.id}/students/${alunoId}`
      );
      toast({
        title: "Aluno removido com sucesso!",
        description: "O aluno foi removido da turma.",
      });
      fetchData(); // Atualizar dados
    } catch (error) {
      toast({
        title: "Erro ao remover aluno",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciamento de Turmas</CardTitle>
            <CardDescription>
              Visualize e gerencie todas as turmas do sistema
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Turma
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingTurma ? "Editar Turma" : "Criar Nova Turma"}
                </DialogTitle>
                <DialogDescription>
                  {editingTurma
                    ? "Atualize os dados da turma"
                    : "Preencha os dados para criar uma nova turma"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Turma</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ciclo">Ciclo</Label>
                    <Input
                      id="ciclo"
                      value={formData.ciclo}
                      onChange={(e) =>
                        setFormData({ ...formData, ciclo: e.target.value })
                      }
                      placeholder="01/2025"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      Unidade{" "}
                      {user?.tipo === "admin"
                        ? `(${unidades.length} disponíveis)`
                        : "(Sua unidade)"}
                    </Label>
                    {user?.tipo === "admin" ? (
                      <Select
                        value={formData.unidade_id}
                        onValueChange={(value) =>
                          setFormData({ ...formData, unidade_id: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {unidades.map((unidade) => (
                            <SelectItem key={unidade.id} value={unidade.id}>
                              {unidade.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={
                          unidades.find((u) => u.id === formData.unidade_id)
                            ?.nome ||
                          user?.unidade_nome ||
                          "Sua unidade"
                        }
                        readOnly
                        className="bg-gray-50 cursor-not-allowed"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Curso{" "}
                      {user?.tipo === "admin"
                        ? `(${cursos.length} disponíveis)`
                        : "(Seu curso)"}
                    </Label>
                    {user?.tipo === "admin" ? (
                      <Select
                        value={formData.curso_id}
                        onValueChange={(value) =>
                          setFormData({ ...formData, curso_id: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {cursos.map((curso) => (
                            <SelectItem key={curso.id} value={curso.id}>
                              {curso.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={
                          cursos.find((c) => c.id === formData.curso_id)
                            ?.nome ||
                          user?.curso_nome ||
                          "Seu curso"
                        }
                        readOnly
                        className="bg-gray-50 cursor-not-allowed"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Instrutor{" "}
                    {user?.tipo === "admin"
                      ? `(${usuarios.length} disponíveis)`
                      : "(Você)"}
                  </Label>
                  {user?.tipo === "admin" ? (
                    <Select
                      value={formData.instrutor_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, instrutor_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o instrutor" />
                      </SelectTrigger>
                      <SelectContent>
                        {usuarios.map((usuario) => (
                          <SelectItem key={usuario.id} value={usuario.id}>
                            {usuario.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={user?.nome || "Você"}
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_inicio">Data Início</Label>
                    <Input
                      id="data_inicio"
                      type="date"
                      value={formData.data_inicio}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          data_inicio: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data_fim">Data Fim</Label>
                    <Input
                      id="data_fim"
                      type="date"
                      value={formData.data_fim}
                      onChange={(e) =>
                        setFormData({ ...formData, data_fim: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="horario_inicio">Horário Início</Label>
                    <Input
                      id="horario_inicio"
                      type="time"
                      value={formData.horario_inicio}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          horario_inicio: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horario_fim">Horário Fim</Label>
                    <Input
                      id="horario_fim"
                      type="time"
                      value={formData.horario_fim}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          horario_fim: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vagas_total">Vagas Total</Label>
                  <Input
                    id="vagas_total"
                    type="number"
                    value={formData.vagas_total}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vagas_total: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingTurma ? "Atualizar Turma" : "Criar Turma"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ciclo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Vagas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {turmas.map((turma) => (
                <TableRow key={turma.id}>
                  <TableCell className="font-medium">{turma.nome}</TableCell>
                  <TableCell>{turma.ciclo}</TableCell>
                  <TableCell>
                    {new Date(turma.data_inicio).toLocaleDateString()} -{" "}
                    {new Date(turma.data_fim).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {turma.horario_inicio} - {turma.horario_fim}
                  </TableCell>
                  <TableCell>
                    {turma.vagas_ocupadas}/{turma.vagas_total}
                  </TableCell>
                  <TableCell>
                    <Badge variant={turma.ativo ? "default" : "secondary"}>
                      {turma.ativo ? "Ativa" : "Inativa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTurma(turma)}
                        title="Visualizar detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManageAlunos(turma)}
                        title="Gerenciar alunos"
                        className="text-green-600 hover:text-green-700"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(turma)}
                        title="Editar turma"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {/* 🗑️ BOTÃO DELETAR TURMA - Apenas para Admin */}
                      {user?.tipo === "admin" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTurma(turma)}
                          title="Deletar turma"
                          className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Dialog para gerenciar alunos da turma */}
      <Dialog open={isAlunoDialogOpen} onOpenChange={setIsAlunoDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Gerenciar Alunos - {selectedTurmaForAlunos?.nome}
            </DialogTitle>
            <DialogDescription>
              Adicione ou remova alunos desta turma
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Alunos Disponíveis</h3>
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {alunos
                  .filter(
                    (aluno) =>
                      !selectedTurmaForAlunos?.alunos_ids?.includes(aluno.id) &&
                      aluno.ativo
                  )
                  .map((aluno) => (
                    <div
                      key={aluno.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                    >
                      <div>
                        <span className="font-medium">{aluno.nome}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {aluno.cpf}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddAlunoToTurma(aluno.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Alunos na Turma (
                {selectedTurmaForAlunos?.alunos_ids?.length || 0}/
                {selectedTurmaForAlunos?.vagas_total || 0})
              </h3>
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {alunos
                  .filter((aluno) =>
                    selectedTurmaForAlunos?.alunos_ids?.includes(aluno.id)
                  )
                  .map((aluno) => (
                    <div
                      key={aluno.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                    >
                      <div>
                        <span className="font-medium">{aluno.nome}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {aluno.cpf}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveAlunoFromTurma(aluno.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remover
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// 📊 RELATÓRIOS DINÂMICOS - Atualizados Automaticamente
const RelatoriosManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔍 FILTROS AVANÇADOS PARA ADMIN
  const [filtros, setFiltros] = useState({
    data_inicio: "",
    data_fim: "",
    unidade_id: "all",
    curso_id: "all",
    turma_id: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Estados para os dropdowns dos filtros
  const [unidades, setUnidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    fetchDynamicStats();

    // Carregar dados para os filtros se for admin
    if (user?.tipo === "admin") {
      fetchFilterData();
    }

    // 🔄 AUTO-REFRESH: Atualizar relatórios a cada 30 segundos
    const interval = setInterval(fetchDynamicStats, 30000);

    return () => clearInterval(interval);
  }, [user]);

  const fetchFilterData = async () => {
    try {
      const [unidadesRes, cursosRes, turmasRes] = await Promise.all([
        axios.get(`${API}/units`),
        axios.get(`${API}/courses`),
        axios.get(`${API}/classes`),
      ]);

      setUnidades(unidadesRes.data);
      setCursos(cursosRes.data);
      setTurmas(turmasRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados dos filtros:", error);
    }
  };

  const fetchDynamicStats = async (customFilters = null) => {
    try {
      // 🎯 FILTROS: Aplicar filtros se for admin e filtros estiverem definidos
      let url = `${API}/reports/teacher-stats`;
      const filtersToUse = customFilters || filtros;

      if (
        user?.tipo === "admin" &&
        (filtersToUse.data_inicio ||
          filtersToUse.data_fim ||
          (filtersToUse.unidade_id && filtersToUse.unidade_id !== "all") ||
          (filtersToUse.curso_id && filtersToUse.curso_id !== "all") ||
          (filtersToUse.turma_id && filtersToUse.turma_id !== "all"))
      ) {
        const params = new URLSearchParams();
        if (filtersToUse.data_inicio)
          params.append("data_inicio", filtersToUse.data_inicio);
        if (filtersToUse.data_fim)
          params.append("data_fim", filtersToUse.data_fim);
        if (filtersToUse.unidade_id && filtersToUse.unidade_id !== "all")
          params.append("unidade_id", filtersToUse.unidade_id);
        if (filtersToUse.curso_id && filtersToUse.curso_id !== "all")
          params.append("curso_id", filtersToUse.curso_id);
        if (filtersToUse.turma_id && filtersToUse.turma_id !== "all")
          params.append("turma_id", filtersToUse.turma_id);
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dynamic stats:", error);
      // Fallback para endpoint antigo se necessário
      if (user?.tipo === "instrutor") {
        try {
          const fallbackResponse = await axios.get(`${API}/teacher/stats`);
          setStats(fallbackResponse.data);
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadFrequencyReport = async () => {
    try {
      // 🎯 FILTROS: Aplicar filtros no download CSV se for admin
      let url = `${API}/reports/attendance?export_csv=true`;

      if (
        user?.tipo === "admin" &&
        (filtros.data_inicio ||
          filtros.data_fim ||
          (filtros.unidade_id && filtros.unidade_id !== "all") ||
          (filtros.curso_id && filtros.curso_id !== "all") ||
          (filtros.turma_id && filtros.turma_id !== "all"))
      ) {
        const params = new URLSearchParams();
        params.append("export_csv", "true");
        if (filtros.data_inicio)
          params.append("data_inicio", filtros.data_inicio);
        if (filtros.data_fim) params.append("data_fim", filtros.data_fim);
        if (filtros.unidade_id && filtros.unidade_id !== "all")
          params.append("unidade_id", filtros.unidade_id);
        if (filtros.curso_id && filtros.curso_id !== "all")
          params.append("curso_id", filtros.curso_id);
        if (filtros.turma_id && filtros.turma_id !== "all")
          params.append("turma_id", filtros.turma_id);
        url = `${API}/reports/attendance?${params.toString()}`;
      }

      const response = await axios.get(url);

      // Criar arquivo CSV e fazer download
      const csvData = response.data.csv_data;
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);

        // Nome do arquivo com filtros aplicados
        let fileName = `relatorio_frequencia_${
          new Date().toISOString().split("T")[0]
        }`;
        if (filtros.data_inicio && filtros.data_fim) {
          fileName += `_${filtros.data_inicio}_a_${filtros.data_fim}`;
        }
        fileName += ".csv";

        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast({
        title: "Relatório exportado com sucesso!",
        description: "O arquivo CSV foi baixado para seu computador.",
      });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Erro ao exportar relatório",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  // 🔍 Função para aplicar filtros
  const aplicarFiltros = () => {
    setLoading(true);
    fetchDynamicStats(filtros);
  };

  // 🧹 Função para limpar filtros
  const limparFiltros = () => {
    const filtrosVazios = {
      data_inicio: "",
      data_fim: "",
      unidade_id: "all",
      curso_id: "all",
      turma_id: "all",
    };
    setFiltros(filtrosVazios);
    setLoading(true);
    fetchDynamicStats(filtrosVazios);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            <span>Carregando relatórios dinâmicos...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 📊 RELATÓRIOS DINÂMICOS - Interface completamente atualizada
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            {user?.tipo === "admin"
              ? "Relatórios Gerais"
              : "Estatísticas das Minhas Turmas"}
          </div>
          <div className="flex items-center gap-2">
            {user?.tipo === "admin" && (
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
            )}
            <Button
              onClick={downloadFrequencyReport}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Exportar CSV
            </Button>
            <div className="flex items-center text-sm text-gray-500">
              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
              Atualizado automaticamente
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          {user?.tipo === "admin"
            ? "Visualize relatórios completos com filtros avançados - Dados em tempo real"
            : "Visualize índices de presença e faltas dos seus alunos - Dados em tempo real"}
        </CardDescription>
      </CardHeader>

      {/* 🔍 FILTROS AVANÇADOS PARA ADMIN */}
      {user?.tipo === "admin" && showFilters && (
        <div className="mx-6 mb-4 p-4 bg-gray-50 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Data Início</Label>
              <Input
                type="date"
                value={filtros.data_inicio}
                onChange={(e) =>
                  setFiltros({ ...filtros, data_inicio: e.target.value })
                }
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Data Fim</Label>
              <Input
                type="date"
                value={filtros.data_fim}
                onChange={(e) =>
                  setFiltros({ ...filtros, data_fim: e.target.value })
                }
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Unidade</Label>
              <Select
                value={filtros.unidade_id || "all"}
                onValueChange={(value) =>
                  setFiltros({
                    ...filtros,
                    unidade_id: value === "all" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Unidades</SelectItem>
                  {unidades.map((unidade) => (
                    <SelectItem key={unidade.id} value={unidade.id}>
                      {unidade.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Curso</Label>
              <Select
                value={filtros.curso_id || "all"}
                onValueChange={(value) =>
                  setFiltros({
                    ...filtros,
                    curso_id: value === "all" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Cursos</SelectItem>
                  {cursos.map((curso) => (
                    <SelectItem key={curso.id} value={curso.id}>
                      {curso.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Turma</Label>
              <Select
                value={filtros.turma_id || "all"}
                onValueChange={(value) =>
                  setFiltros({
                    ...filtros,
                    turma_id: value === "all" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Turmas</SelectItem>
                  {turmas.map((turma) => (
                    <SelectItem key={turma.id} value={turma.id}>
                      {turma.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={aplicarFiltros}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Search className="h-4 w-4 mr-1" />
              Aplicar Filtros
            </Button>
            <Button onClick={limparFiltros} variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          </div>
        </div>
      )}
      <CardContent>
        {/* Verificar se há dados após filtros */}
        {stats && stats.total_alunos === 0 && user?.tipo === "admin" && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhum dado encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Os filtros aplicados não retornaram nenhum resultado. Tente
              ajustar os critérios ou limpar os filtros.
            </p>
            <Button onClick={limparFiltros} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Dados normais */}
        {(!stats || stats.total_alunos > 0 || user?.tipo !== "admin") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 🟢 MAIORES PRESENÇAS - Dados Dinâmicos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">
                  Maiores Presenças
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.maiores_presencas &&
                  stats.maiores_presencas.length > 0 ? (
                    stats.maiores_presencas.map((aluno, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{aluno.nome}</p>
                          <p className="text-sm text-gray-500">{aluno.turma}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {aluno.taxa_presenca}
                          </p>
                          <p className="text-xs text-gray-500">
                            {aluno.aulas_presentes}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum dado de presença disponível ainda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 🔴 MAIORES FALTAS - Dados Dinâmicos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600">
                  Maiores Faltas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.maiores_faltas && stats.maiores_faltas.length > 0 ? (
                    stats.maiores_faltas.map((aluno, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{aluno.nome}</p>
                          <p className="text-sm text-gray-500">{aluno.turma}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">
                            {aluno.taxa_presenca}
                          </p>
                          <p className="text-xs text-gray-500">
                            {aluno.faltas}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum dado de falta disponível ainda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 📊 RESUMO GERAL - Dados Dinâmicos */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  Resumo Geral das Suas Turmas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.taxa_media_presenca || "0%"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Taxa Média de Presença
                    </p>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {stats.total_alunos || 0}
                    </p>
                    <p className="text-sm text-gray-600">Total de Alunos</p>
                  </div>

                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.alunos_em_risco || 0}
                    </p>
                    <p className="text-sm text-gray-600">Alunos em Risco</p>
                  </div>

                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {stats.desistentes || 0}
                    </p>
                    <p className="text-sm text-gray-600">Desistentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 📋 RESUMO POR TURMA - NOVO */}
            {stats.resumo_turmas && stats.resumo_turmas.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo por Turma</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.resumo_turmas.map((turma, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-lg mb-2">
                          {turma.nome}
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Alunos</p>
                            <p className="font-bold">{turma.total_alunos}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Taxa Média</p>
                            <p className="font-bold text-blue-600">
                              {turma.taxa_media}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Em Risco</p>
                            <p className="font-bold text-yellow-600">
                              {turma.alunos_risco}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Alunos Manager Component COMPLETO
const AlunosManager = () => {
  const { user } = useAuth(); // 🔧 HOOK ORDER FIX: useAuth deve vir primeiro
  const { toast } = useToast();

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAluno, setEditingAluno] = useState(null);
  const [isDropoutDialogOpen, setIsDropoutDialogOpen] = useState(false);
  const [isAtestadoDialogOpen, setIsAtestadoDialogOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [dropoutReason, setDropoutReason] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    idade: "",
    rg: "",
    data_nascimento: "",
    genero: "",
    telefone: "",
    email: "",
    endereco: "",
    nome_responsavel: "",
    telefone_responsavel: "",
    observacoes: "",
    turma_id: "", // ✅ Campo turma adicionado
  });

  useEffect(() => {
    fetchAlunos();
    fetchTurmas();
  }, []);

  const fetchAlunos = async () => {
    try {
      console.log("🔍 Buscando alunos...");
      const response = await axios.get(`${API}/students`);
      console.log("✅ Alunos recebidos:", response.data.length, "alunos");
      setAlunos(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar alunos:", error);
      console.error("Status:", error.response?.status);
      console.error("Mensagem:", error.response?.data);

      // Mostrar erro para o usuário
      toast({
        title: "Erro ao carregar alunos",
        description: `Erro ${error.response?.status || "desconhecido"}: ${
          error.response?.data?.detail ||
          "Não foi possível carregar a lista de alunos"
        }`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTurmas = async () => {
    try {
      console.log("🔍 Buscando turmas...");
      const response = await axios.get(`${API}/classes`);
      console.log("✅ Turmas recebidas:", response.data.length, "turmas");
      setTurmas(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar turmas:", error);
      toast({
        title: "Erro ao carregar turmas",
        description: "Não foi possível carregar a lista de turmas",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDAÇÃO: Campos obrigatórios
    if (!formData.nome.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Nome completo é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!formData.cpf.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "CPF é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!formData.data_nascimento) {
      toast({
        title: "Campo obrigatório",
        description: "Data de nascimento é obrigatória",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingAluno) {
        await axios.put(`${API}/students/${editingAluno.id}`, formData);
        toast({
          title: "Aluno atualizado com sucesso!",
          description: "As informações do aluno foram atualizadas.",
        });
      } else {
        const response = await axios.post(`${API}/students`, formData);
        const novoAlunoId = response.data.id;

        // Se turma foi selecionada (e não é "sem_turma"), adicionar aluno à turma
        if (formData.turma_id && formData.turma_id !== "sem_turma") {
          try {
            await axios.put(
              `${API}/classes/${formData.turma_id}/students/${novoAlunoId}`
            );
            toast({
              title: "Aluno criado e alocado com sucesso!",
              description:
                "O aluno foi adicionado ao sistema e à turma selecionada.",
            });
          } catch (turmaError) {
            console.error("Erro ao adicionar aluno à turma:", turmaError);
            toast({
              title: "Aluno criado, mas erro na alocação",
              description:
                "Aluno criado com sucesso, mas não foi possível adicioná-lo à turma. Faça isso manualmente.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Aluno criado com sucesso!",
            description:
              "O novo aluno foi adicionado ao sistema (sem turma específica).",
          });
        }
      }

      setIsDialogOpen(false);
      setEditingAluno(null);
      resetForm();
      fetchAlunos();
    } catch (error) {
      toast({
        title: editingAluno ? "Erro ao atualizar aluno" : "Erro ao criar aluno",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      cpf: "",
      idade: "",
      rg: "",
      data_nascimento: "",
      genero: "",
      telefone: "",
      email: "",
      endereco: "",
      nome_responsavel: "",
      telefone_responsavel: "",
      observacoes: "",
      turma_id: "", // ✅ Campo turma resetado
    });
  };

  const handleViewAluno = (aluno) => {
    alert(
      `👤 DETALHES DO ALUNO\n\n` +
        `📋 DADOS OBRIGATÓRIOS:\n` +
        `Nome: ${aluno.nome}\n` +
        `CPF: ${aluno.cpf}\n` +
        `Idade: ${aluno.idade ? `${aluno.idade} anos` : "N/A"}\n\n` +
        `📄 DADOS COMPLEMENTARES:\n` +
        `RG: ${aluno.rg || "N/A"}\n` +
        `Data Nascimento: ${aluno.data_nascimento || "N/A"}\n` +
        `Gênero: ${aluno.genero || "N/A"}\n` +
        `Telefone: ${aluno.telefone || "N/A"}\n` +
        `Email: ${aluno.email || "N/A"}\n` +
        `Endereço: ${aluno.endereco || "N/A"}\n` +
        `Responsável: ${aluno.nome_responsavel || "N/A"}\n` +
        `Tel. Responsável: ${aluno.telefone_responsavel || "N/A"}\n` +
        `Status: ${aluno.ativo ? "Ativo" : "Inativo"}\n` +
        `Observações: ${aluno.observacoes || "Nenhuma"}`
    );
  };

  const handleEdit = (aluno) => {
    setEditingAluno(aluno);
    setFormData({
      nome: aluno.nome,
      cpf: aluno.cpf,
      idade: aluno.idade || "",
      rg: aluno.rg || "",
      data_nascimento: aluno.data_nascimento || "",
      genero: aluno.genero || "",
      telefone: aluno.telefone || "",
      email: aluno.email || "",
      endereco: aluno.endereco || "",
      nome_responsavel: aluno.nome_responsavel || "",
      telefone_responsavel: aluno.telefone_responsavel || "",
      observacoes: aluno.observacoes || "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenDialog = () => {
    setEditingAluno(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleMarkAsDropout = (aluno) => {
    setSelectedAluno(aluno);
    setDropoutReason("");
    setIsDropoutDialogOpen(true);
  };

  const handleUploadAtestado = (aluno) => {
    setSelectedAluno(aluno);
    setSelectedFile(null);
    setIsAtestadoDialogOpen(true);
  };

  const submitDropout = async () => {
    if (!dropoutReason.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, informe o motivo da desistência.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post(`${API}/dropouts`, {
        aluno_id: selectedAluno.id,
        motivo: dropoutReason,
        data_desistencia: new Date().toISOString().split("T")[0],
      });

      // Atualizar status do aluno para desistente
      await axios.put(`${API}/students/${selectedAluno.id}`, {
        ...selectedAluno,
        status: "desistente",
      });

      toast({
        title: "Desistência registrada",
        description: `${selectedAluno.nome} foi marcado como desistente.`,
      });

      fetchAlunos();
      setIsDropoutDialogOpen(false);
      setSelectedAluno(null);
      setDropoutReason("");
    } catch (error) {
      console.error("Error marking as dropout:", error);
      toast({
        title: "Erro ao registrar desistência",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const submitAtestado = async () => {
    if (!selectedFile) {
      toast({
        title: "Arquivo obrigatório",
        description: "Por favor, selecione um arquivo de atestado.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("aluno_id", selectedAluno.id);
      formData.append("tipo", "atestado_medico");

      await axios.post(`${API}/upload/atestado`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Atestado enviado",
        description: `Atestado médico de ${selectedAluno.nome} foi registrado.`,
      });

      setIsAtestadoDialogOpen(false);
      setSelectedAluno(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading atestado:", error);
      toast({
        title: "Erro ao enviar atestado",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ativo: "default",
      desistente: "destructive",
      concluido: "secondary",
      suspenso: "outline",
    };
    return colors[status] || "default";
  };

  const getStatusLabel = (status) => {
    const labels = {
      ativo: "Ativo",
      desistente: "Desistente",
      concluido: "Concluído",
      suspenso: "Suspenso",
    };
    return labels[status] || status;
  };

  const handleFixCreatedBy = async () => {
    const confirmFix = window.confirm(
      "🔧 CORREÇÃO DE VÍNCULOS\n\n" +
        "Esta operação irá:\n" +
        "• Encontrar alunos antigos sem vínculo com instrutor\n" +
        "• Associá-los automaticamente aos instrutores das turmas onde estão\n" +
        "• Permitir que instrutores vejam seus alunos corretamente\n\n" +
        "⚠️ IMPORTANTE: Esta correção é segura e reversível.\n\n" +
        "Continuar com a correção?"
    );

    if (!confirmFix) return;

    try {
      console.log("🔧 Iniciando correção de vínculos...");

      const response = await axios.post(`${API}/students/fix-created-by`);
      const result = response.data;

      console.log("✅ Resultado da correção:", result);

      toast({
        title: "Correção concluída com sucesso!",
        description: `${result.alunos_corrigidos} alunos foram associados aos instrutores corretos.`,
        className: "bg-green-50 border-green-200",
      });

      if (result.alunos_corrigidos > 0) {
        // Mostrar detalhes da correção
        const detalhesTexto = result.detalhes
          .filter((d) => d.acao === "associado_ao_instrutor_da_turma")
          .slice(0, 10)
          .map((d) => `• ${d.aluno} → ${d.instrutor} (${d.turma})`)
          .join("\n");

        if (detalhesTexto) {
          alert(
            `✅ CORREÇÃO REALIZADA COM SUCESSO\n\n` +
              `${result.alunos_corrigidos} alunos foram associados aos instrutores:\n\n` +
              `${detalhesTexto}` +
              `${
                result.alunos_corrigidos > 10
                  ? `\n\n... e mais ${result.alunos_corrigidos - 10} alunos`
                  : ""
              }\n\n` +
              `Agora os instrutores podem ver seus alunos normalmente!`
          );
        }

        // Atualizar lista de alunos
        fetchAlunos();
      }
    } catch (error) {
      console.error("❌ Erro na correção de vínculos:", error);
      toast({
        title: "Erro na correção",
        description:
          error.response?.data?.detail ||
          "Erro interno na correção de vínculos",
        variant: "destructive",
      });
    }
  };

  const handleCleanupOrphans = async () => {
    const confirmCleanup = window.confirm(
      "🚨 ATENÇÃO: Esta operação irá remover todos os alunos que não estão vinculados a nenhuma turma ativa.\n\nEsta ação não pode ser desfeita. Deseja continuar?"
    );

    if (!confirmCleanup) return;

    try {
      console.log("🧹 Iniciando limpeza de alunos órfãos...");

      const response = await axios.post(`${API}/students/cleanup-orphans`);
      const result = response.data;

      console.log("✅ Resultado da limpeza:", result);

      toast({
        title: "Limpeza concluída",
        description: `${result.orphans_removed} alunos órfãos foram removidos do sistema.`,
      });

      // Atualizar lista de alunos
      fetchAlunos();
    } catch (error) {
      console.error("❌ Erro na limpeza de órfãos:", error);
      toast({
        title: "Erro na limpeza",
        description:
          error.response?.data?.detail ||
          "Erro interno na limpeza de alunos órfãos",
        variant: "destructive",
      });
    }
  };

  const handleDebugStudents = async (userId) => {
    try {
      const response = await axios.get(`${API}/debug/students/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const debug = response.data;

      // Mostrar informações detalhadas no console
      console.log("🔍 DEBUG ALUNOS:", debug);

      toast({
        title: "Debug Executado",
        description: `Encontrados: ${debug.totais.alunos_filtrados} alunos (ver console para detalhes)`,
      });

      // Criar uma janela popup com os detalhes
      const details = `
🔍 DEBUG ALUNOS - ${debug.usuario.nome} (${debug.usuario.tipo})

TOTAIS:
• Todos os alunos no sistema: ${debug.totais.todos_alunos}
• Alunos criados por você: ${debug.totais.alunos_created_by}
• Alunos ativos: ${debug.totais.alunos_ativos}
• Alunos que você vê: ${debug.totais.alunos_filtrados}
• Alunos SEM created_by: ${debug.totais.alunos_sem_created_by}
• Alunos de OUTROS usuários: ${debug.totais.alunos_outros_created_by}

ALUNOS CRIADOS POR VOCÊ:
${
  debug.alunos_created_by.length > 0
    ? debug.alunos_created_by
        .map(
          (a) =>
            `• ${a.nome} (CPF: ${a.cpf}) - Ativo: ${a.ativo ? "Sim" : "Não"}`
        )
        .join("\n")
    : "⚠️ Nenhum aluno foi criado por você"
}

ALUNOS SEM CREATED_BY (órfãos):
${
  debug.alunos_sem_created_by?.length > 0
    ? debug.alunos_sem_created_by
        .map((a) => `• ${a.nome} (CPF: ${a.cpf})`)
        .join("\n")
    : "✅ Nenhum aluno órfão"
}

ALUNOS DE OUTROS USUÁRIOS:
${
  debug.alunos_outros_created_by?.length > 0
    ? debug.alunos_outros_created_by
        .map((a) => `• ${a.nome} → ${a.created_by_name || "Desconhecido"}`)
        .join("\n")
    : "✅ Nenhum aluno de outros usuários"
}
      `;

      alert(details);
    } catch (error) {
      console.error("Erro no debug:", error);
      toast({
        title: "Erro",
        description: "Erro ao executar debug",
        variant: "destructive",
      });
    }
  };

  const handleResetDatabase = async () => {
    const confirmReset = window.confirm(
      "🚨 ATENÇÃO: RESET TOTAL DO BANCO\n\n" +
        "Esta operação irá APAGAR PERMANENTEMENTE:\n" +
        "• TODOS os alunos cadastrados\n" +
        "• TODAS as turmas criadas\n" +
        "• TODAS as chamadas registradas\n\n" +
        "⚠️ ESTA AÇÃO NÃO PODE SER DESFEITA!\n\n" +
        "Tem certeza que deseja LIMPAR COMPLETAMENTE o banco?"
    );

    if (!confirmReset) return;

    const confirmText = window.prompt(
      "Para confirmar o RESET TOTAL, digite exatamente: CONFIRMO"
    );

    if (confirmText !== "CONFIRMO") {
      toast({
        title: "Reset cancelado",
        description: "Texto de confirmação incorreto",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("🚨 Iniciando RESET TOTAL do banco...");

      const response = await axios.post(`${API}/database/reset-all`);
      const result = response.data;

      console.log("✅ Reset concluído:", result);

      alert(
        `🚨 BANCO RESETADO COMPLETAMENTE\n\n` +
          `Removidos:\n` +
          `• ${result.removidos.alunos} alunos\n` +
          `• ${result.removidos.turmas} turmas\n` +
          `• ${result.removidos.chamadas} chamadas\n\n` +
          `${result.status}\n\n` +
          `O banco está limpo e pronto para recomeçar!`
      );

      // Recarregar dados
      fetchAlunos();

      toast({
        title: "✅ Reset Concluído",
        description: "Banco limpo - pronto para recomeçar",
        className: "bg-green-50 border-green-200",
      });
    } catch (error) {
      console.error("❌ Erro no reset:", error);
      toast({
        title: "Erro no Reset",
        description:
          error.response?.data?.detail || "Erro interno no reset do banco",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciamento de Alunos</CardTitle>
            <CardDescription>
              {user?.tipo === "admin"
                ? "Gerencie todos os alunos cadastrados no sistema"
                : `Gerencie alunos das suas turmas (${
                    user?.curso_nome || "seu curso"
                  })`}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {/* Correção de Alunos sem created_by - Apenas Admin */}
            {user?.tipo === "admin" && (
              <Button
                onClick={handleFixCreatedBy}
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
                title="Corrigir alunos antigos que não aparecem para instrutores"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Corrigir Vínculos
              </Button>
            )}

            {/* Debug de Alunos - Apenas Admin */}
            {user?.tipo === "admin" && (
              <Button
                onClick={() => handleDebugStudents(user.id)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                title="Ver detalhes dos alunos que você deveria enxergar"
              >
                <Search className="h-4 w-4 mr-2" />
                Debug Alunos
              </Button>
            )}

            {/* RESET TOTAL DO BANCO - Apenas Admin */}
            {user?.tipo === "admin" && (
              <Button
                onClick={handleResetDatabase}
                variant="outline"
                className="border-red-800 text-red-800 hover:bg-red-100"
                title="🚨 APAGAR TODOS os alunos e turmas do banco"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                🚨 RESET TOTAL
              </Button>
            )}

            {/* Limpeza de Alunos Órfãos - Apenas Admin */}
            {user?.tipo === "admin" && (
              <Button
                onClick={handleCleanupOrphans}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Órfãos
              </Button>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleOpenDialog}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Aluno
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAluno ? "Editar Aluno" : "Cadastrar Novo Aluno"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingAluno
                      ? "Atualize os dados do aluno"
                      : "Preencha os dados para cadastrar um novo aluno"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Campos Obrigatórios - Destacados */}
                  <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      📋 Cadastro do aluno
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="nome"
                          className="text-blue-700 font-medium"
                        >
                          Nome Completo *
                        </Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          placeholder="Ex: João Silva Santos"
                          className="border-blue-300 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="idade"
                          className="text-blue-700 font-medium"
                        >
                          Idade
                        </Label>
                        <Input
                          id="idade"
                          type="number"
                          value={formData.idade}
                          onChange={(e) =>
                            setFormData({ ...formData, idade: e.target.value })
                          }
                          placeholder="Ex: 25"
                          min="1"
                          max="120"
                          className="border-blue-300 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="cpf"
                          className="text-blue-700 font-medium"
                        >
                          CPF *
                        </Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) =>
                            setFormData({ ...formData, cpf: e.target.value })
                          }
                          placeholder="000.000.000-00"
                          className="border-blue-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campo Turma - Entre Obrigatórios e Complementares */}
                  <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      🎯 Alocação em Turma
                    </h3>
                    <div className="space-y-2">
                      <Label
                        htmlFor="turma_id"
                        className="text-green-700 font-medium"
                      >
                        Turma (Opcional)
                      </Label>
                      <Select
                        value={formData.turma_id}
                        onValueChange={(value) =>
                          setFormData({ ...formData, turma_id: value })
                        }
                      >
                        <SelectTrigger className="border-green-300 focus:border-green-500">
                          <SelectValue placeholder="Selecione uma turma ou deixe em branco" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sem_turma">
                            Sem turma (não alocado)
                          </SelectItem>
                          {turmas.map((turma) => (
                            <SelectItem key={turma.id} value={turma.id}>
                              {turma.nome} -{" "}
                              {turma.curso_nome || "Curso não informado"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-green-600">
                        💡 Você pode deixar sem turma e alocar depois, ou
                        selecionar uma turma específica
                      </p>
                    </div>
                  </div>

                  {/* Campos Complementares */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      📄 Informações Complementares
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rg">RG</Label>
                        <Input
                          id="rg"
                          value={formData.rg}
                          onChange={(e) =>
                            setFormData({ ...formData, rg: e.target.value })
                          }
                          placeholder="00.000.000-0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="data_nascimento">
                          Data de Nascimento *
                        </Label>
                        <Input
                          id="data_nascimento"
                          type="date"
                          value={formData.data_nascimento}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              data_nascimento: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Gênero</Label>
                        <Select
                          value={formData.genero}
                          onValueChange={(value) =>
                            setFormData({ ...formData, genero: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                            <SelectItem value="nao_informado">
                              Não informado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              telefone: e.target.value,
                            })
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="aluno@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço Completo</Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) =>
                          setFormData({ ...formData, endereco: e.target.value })
                        }
                        placeholder="Rua, número, bairro, cidade, CEP"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome_responsavel">
                          Nome do Responsável
                        </Label>
                        <Input
                          id="nome_responsavel"
                          value={formData.nome_responsavel}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nome_responsavel: e.target.value,
                            })
                          }
                          placeholder="Para menores de idade"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefone_responsavel">
                          Telefone do Responsável
                        </Label>
                        <Input
                          id="telefone_responsavel"
                          value={formData.telefone_responsavel}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              telefone_responsavel: e.target.value,
                            })
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={formData.observacoes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            observacoes: e.target.value,
                          })
                        }
                        placeholder="Observações sobre o aluno..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingAluno ? "Atualizar Aluno" : "Cadastrar Aluno"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      {/* Card de Permissões para Usuários Não-Admin */}
      {user?.tipo !== "admin" && (
        <div className="mx-6 mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2 text-orange-800">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">Suas Permissões:</span>
          </div>
          <div className="mt-2 text-sm text-orange-700">
            <p>
              • <strong>Tipo:</strong>{" "}
              {user.tipo?.charAt(0).toUpperCase() + user.tipo?.slice(1)}
            </p>
            <p>
              • <strong>Unidade:</strong> {user?.unidade_nome || "Sua unidade"}
            </p>
            <p>
              • <strong>Curso:</strong> {user?.curso_nome || "Seu curso"}
            </p>
            <p>
              • <strong>Escopo:</strong>{" "}
              {user?.tipo === "instrutor"
                ? "Alunos do seu curso específico"
                : user?.tipo === "pedagogo"
                ? "Todos os alunos da sua unidade"
                : "Alunos das turmas que você monitora"}
            </p>
            <p>
              • <strong>CSV:</strong>{" "}
              {user?.tipo === "instrutor"
                ? "Pode importar apenas do seu curso"
                : user?.tipo === "pedagogo"
                ? "Pode importar de qualquer curso da unidade"
                : "Não pode importar (apenas visualizar)"}
            </p>
            {user?.tipo === "instrutor" && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <p className="font-medium">💡 Dicas para Instrutores:</p>
                <p>
                  • Turmas inexistentes no CSV serão criadas automaticamente
                </p>
                <p>• Alunos sem turma definida ficarão como "não alocado"</p>
                <p>• Você pode gerenciar alunos entre suas turmas</p>
              </div>
            )}
          </div>
        </div>
      )}

      <CardContent>
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell className="font-medium">{aluno.nome}</TableCell>
                  <TableCell>{aluno.cpf}</TableCell>
                  <TableCell className="text-center font-medium">
                    {aluno.idade ? `${aluno.idade} anos` : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {aluno.telefone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {aluno.telefone}
                        </div>
                      )}
                      {aluno.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {aluno.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(aluno.status)}>
                      {getStatusLabel(aluno.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewAluno(aluno)}
                        title="Visualizar detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(aluno)}
                        title="Editar aluno"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {aluno.status === "ativo" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsDropout(aluno)}
                          title="Registrar desistência"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUploadAtestado(aluno)}
                        title="Upload atestado médico"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Dialog para registrar desistência */}
      <Dialog open={isDropoutDialogOpen} onOpenChange={setIsDropoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Desistência</DialogTitle>
            <DialogDescription>
              Registrar a desistência de {selectedAluno?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Motivo da desistência *</Label>
              <Textarea
                value={dropoutReason}
                onChange={(e) => setDropoutReason(e.target.value)}
                placeholder="Descreva o motivo da desistência..."
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDropoutDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={submitDropout}
                className="bg-red-600 hover:bg-red-700"
              >
                Registrar Desistência
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para upload de atestado */}
      <Dialog
        open={isAtestadoDialogOpen}
        onOpenChange={setIsAtestadoDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Atestado Médico</DialogTitle>
            <DialogDescription>
              Enviar atestado médico para {selectedAluno?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Arquivo do atestado *</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <p className="text-sm text-gray-500 mt-1">
                Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAtestadoDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={submitAtestado}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Enviar Atestado
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Unidades Manager Component COMPLETO
const UnidadesManager = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnidade, setEditingUnidade] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    responsavel: "",
    email: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUnidades();
  }, []);

  const fetchUnidades = async () => {
    try {
      const response = await axios.get(`${API}/units`);
      setUnidades(response.data);
    } catch (error) {
      console.error("Error fetching unidades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUnidade) {
        await axios.put(`${API}/units/${editingUnidade.id}`, formData);
        toast({
          title: "Unidade atualizada com sucesso!",
          description: "As informações da unidade foram atualizadas.",
        });
      } else {
        await axios.post(`${API}/units`, formData);
        toast({
          title: "Unidade criada com sucesso!",
          description: "A nova unidade foi adicionada ao sistema.",
        });
      }

      setIsDialogOpen(false);
      setEditingUnidade(null);
      resetForm();
      fetchUnidades();
    } catch (error) {
      toast({
        title: editingUnidade
          ? "Erro ao atualizar unidade"
          : "Erro ao criar unidade",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      endereco: "",
      telefone: "",
      responsavel: "",
      email: "",
    });
  };

  const handleEdit = (unidade) => {
    setEditingUnidade(unidade);
    setFormData({
      nome: unidade.nome,
      endereco: unidade.endereco,
      telefone: unidade.telefone || "",
      responsavel: unidade.responsavel || "",
      email: unidade.email || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (unidadeId) => {
    if (window.confirm("Tem certeza que deseja desativar esta unidade?")) {
      try {
        await axios.delete(`${API}/units/${unidadeId}`);
        toast({
          title: "Unidade desativada com sucesso!",
          description: "A unidade foi desativada do sistema.",
        });
        fetchUnidades();
      } catch (error) {
        toast({
          title: "Erro ao desativar unidade",
          description: error.response?.data?.detail || "Tente novamente",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpenDialog = () => {
    setEditingUnidade(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciamento de Unidades</CardTitle>
            <CardDescription>
              Gerencie as unidades do Instituto da Oportunidade Social
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Unidade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingUnidade ? "Editar Unidade" : "Criar Nova Unidade"}
                </DialogTitle>
                <DialogDescription>
                  {editingUnidade
                    ? "Atualize os dados da unidade"
                    : "Preencha os dados para criar uma nova unidade"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Unidade</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Ex: Unidade Centro"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) =>
                      setFormData({ ...formData, endereco: e.target.value })
                    }
                    placeholder="Rua, número, bairro, cidade"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: e.target.value })
                    }
                    placeholder="(11) 1234-5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input
                    id="responsavel"
                    value={formData.responsavel}
                    onChange={(e) =>
                      setFormData({ ...formData, responsavel: e.target.value })
                    }
                    placeholder="Nome do responsável"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="unidade@ios.com.br"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingUnidade ? "Atualizar Unidade" : "Criar Unidade"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unidades.map((unidade) => (
                <TableRow key={unidade.id}>
                  <TableCell className="font-medium">{unidade.nome}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {unidade.endereco}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {unidade.telefone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {unidade.telefone}
                        </div>
                      )}
                      {unidade.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {unidade.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{unidade.responsavel || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={unidade.ativo ? "default" : "secondary"}>
                      {unidade.ativo ? "Ativa" : "Inativa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(unidade)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(unidade.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Cursos Manager Component COMPLETO
const CursosManager = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    carga_horaria: "",
    categoria: "",
    pre_requisitos: "",
    dias_aula: ["segunda", "terca", "quarta", "quinta"], // 📅 Dias de aula padrão
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get(`${API}/courses`);
      setCursos(response.data);
    } catch (error) {
      console.error("Error fetching cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        carga_horaria: parseInt(formData.carga_horaria),
      };

      if (editingCurso) {
        await axios.put(`${API}/courses/${editingCurso.id}`, submitData);
        toast({
          title: "Curso atualizado com sucesso!",
          description: "As informações do curso foram atualizadas.",
        });
      } else {
        await axios.post(`${API}/courses`, submitData);
        toast({
          title: "Curso criado com sucesso!",
          description: "O novo curso foi adicionado ao sistema.",
        });
      }

      setIsDialogOpen(false);
      setEditingCurso(null);
      resetForm();
      fetchCursos();
    } catch (error) {
      toast({
        title: editingCurso ? "Erro ao atualizar curso" : "Erro ao criar curso",
        description: error.response?.data?.detail || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      carga_horaria: "",
      categoria: "",
      pre_requisitos: "",
      dias_aula: ["segunda", "terca", "quarta", "quinta"], // 📅 Resetar dias padrão
    });
  };

  const handleEdit = (curso) => {
    setEditingCurso(curso);
    setFormData({
      nome: curso.nome,
      descricao: curso.descricao || "",
      carga_horaria: curso.carga_horaria.toString(),
      categoria: curso.categoria || "",
      pre_requisitos: curso.pre_requisitos || "",
      dias_aula: curso.dias_aula || ["segunda", "terca", "quarta", "quinta"], // 📅 Carregar dias de aula
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (cursoId) => {
    if (window.confirm("Tem certeza que deseja desativar este curso?")) {
      try {
        await axios.delete(`${API}/courses/${cursoId}`);
        toast({
          title: "Curso desativado com sucesso!",
          description: "O curso foi desativado do sistema.",
        });
        fetchCursos();
      } catch (error) {
        toast({
          title: "Erro ao desativar curso",
          description: error.response?.data?.detail || "Tente novamente",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpenDialog = () => {
    setEditingCurso(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciamento de Cursos</CardTitle>
            <CardDescription>
              Gerencie os cursos oferecidos pelo Instituto
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Curso
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingCurso ? "Editar Curso" : "Criar Novo Curso"}
                </DialogTitle>
                <DialogDescription>
                  {editingCurso
                    ? "Atualize os dados do curso"
                    : "Preencha os dados para criar um novo curso"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Curso</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Ex: Informática Básica"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    placeholder="Descreva o curso..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carga_horaria">Carga Horária (horas)</Label>
                  <Input
                    id="carga_horaria"
                    type="number"
                    value={formData.carga_horaria}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        carga_horaria: e.target.value,
                      })
                    }
                    placeholder="Ex: 80"
                    min="1"
                    required
                  />
                </div>

                {/* 📅 Campo Dias de Aula */}
                <div className="space-y-2">
                  <Label>Dias de Aula</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "segunda", label: "Segunda" },
                      { key: "terca", label: "Terça" },
                      { key: "quarta", label: "Quarta" },
                      { key: "quinta", label: "Quinta" },
                      { key: "sexta", label: "Sexta" },
                      { key: "sabado", label: "Sábado" },
                    ].map((dia) => (
                      <div
                        key={dia.key}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={dia.key}
                          checked={formData.dias_aula.includes(dia.key)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                dias_aula: [...formData.dias_aula, dia.key],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                dias_aula: formData.dias_aula.filter(
                                  (d) => d !== dia.key
                                ),
                              });
                            }
                          }}
                        />
                        <Label
                          htmlFor={dia.key}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {dia.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Selecione os dias da semana em que o curso tem aulas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input
                    id="categoria"
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    placeholder="Ex: Tecnologia, Gestão"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pre_requisitos">Pré-requisitos</Label>
                  <Textarea
                    id="pre_requisitos"
                    value={formData.pre_requisitos}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pre_requisitos: e.target.value,
                      })
                    }
                    placeholder="Liste os pré-requisitos..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingCurso ? "Atualizar Curso" : "Criar Curso"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cursos.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell className="font-medium">{curso.nome}</TableCell>
                  <TableCell>
                    {curso.categoria && (
                      <Badge variant="outline">{curso.categoria}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {curso.carga_horaria}h
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {curso.descricao || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={curso.ativo ? "default" : "secondary"}>
                      {curso.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(curso)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(curso.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

// Route Components
const LoginRoute = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando ClassCheck...</p>
          <p className="text-sm text-gray-400 mt-2">
            Se demorar muito, recarregue a página
          </p>
        </div>
      </div>
    );
  if (user) return <Navigate to="/" replace />;

  return <Login />;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default App;
